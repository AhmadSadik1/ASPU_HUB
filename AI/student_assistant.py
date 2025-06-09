from utils import embeddings, response_llm
from prompts.system_prompts import QA_PROMPT
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
import os
from langchain.chains import RetrievalQA
from typing import TypedDict, List
from langchain_core.documents import Document


VECTORSTORE_DIR = "./chroma_db_lg"


def setup_combined_document_store(split_dir: str, persist_directory: str):
    """Combine full-chunk and split-chunk documents into one Chroma vector store."""

    documents = []
    encodings_to_try = ["utf-8", "cp1256", "latin-1", "iso-8859-1"] # Added cp1256 for Arabic
    supported_extensions = [".txt"] # Add other extensions if needed    

    if os.path.exists(split_dir):
        print(f"\nجاري تحميل المستندات من {split_dir} مع التقطيع...")
        for root, _, files in os.walk(split_dir):
            for file in files:
                if any(file.lower().endswith(ext) for ext in supported_extensions):
                    file_path = os.path.join(root, file)
                    loaded = False
                    for enc in encodings_to_try:
                        try:
                            loader = TextLoader(file_path, encoding=enc)
                            raw_docs = loader.load()
                            splitter = RecursiveCharacterTextSplitter(chunk_size=600, chunk_overlap=100)
                            split_docs = splitter.split_documents(raw_docs)
                            documents.extend(split_docs)
                            print(f"تم تحميل وتقسيم {file} إلى {len(split_docs)} جزء بترميز {enc}")
                            loaded = True
                            break
                        except Exception:
                            continue
                    if not loaded:
                        print(f"فشل تحميل وتقسيم {file_path} بأي من الترميزات.")


    if not documents:
        print("لم يتم العثور على مستندات قابلة للقراءة في المجلد المحدد.")
        return None

    print(f"\nمجموع المستندات / الأجزاء المحملة: {len(documents)}")

    # 3. Create vectorstore
    try:
        print(f"\n جاري إنشاء مخزن المتجهات في {persist_directory}...")
        if os.path.isdir(persist_directory) and os.listdir(persist_directory):
            print(f" تم العثور على مخزن متجهات موجود مسبقًا في {persist_directory}، يتم تحميله الآن...")
            try:
                return Chroma(persist_directory=persist_directory, embedding_function=embeddings)
            except Exception as e:
                print(f"⚠️ تعذر تحميل المخزن السابق: {e}، سيتم إعادة إنشائه الآن.")

        vectorstore = Chroma.from_documents(
            documents=documents,
            embedding=embeddings,
            persist_directory=persist_directory
        )
        print(f"تمت معالجة {len(documents)} مستند/جزء بنجاح.")
        print("تم إنشاء Chroma Vector Store بنجاح.")
        return vectorstore            
    except Exception as e:
        print(f"فشل في إنشاء مخزن المتجهات: {e}")
        return None


def initialize_app():
    vectorstore = setup_combined_document_store(
        split_dir="lectures",
        persist_directory=VECTORSTORE_DIR
)
    if vectorstore is None:
        raise ValueError("تعذّر إعداد مخزن المتجهات. تأكد من وجود ملفات نصية صحيحة في المجلد.")
    
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 5})
    # نبني سلسلة RetrievalQA
    qa_chain = RetrievalQA.from_chain_type(
        llm=response_llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True
    )
    return qa_chain


def main_lg():
    """تشغيل التطبيق: استقبال أسئلة المستخدم والإجابة عليها باستخدام RAG."""
    qa_chain = initialize_app()

    print("\n--- تطبيق RAG جاهز للاستقبال ---")
    while True:
        user_query = input("\nاكتب سؤالك (أو 'exit' للخروج): ").strip()
        if user_query.lower() in ['exit', 'q']:
            print("دخول الخروج. إلى اللقاء!")
            break

        # استدعاء السلسلة للحصول على النتيجة والمصادر
        result = qa_chain.invoke({"query": user_query})
        answer = result.get("result")
        sources = result.get("source_documents", [])

        print("\nالإجابة:")
        print(answer)
        if sources:
            print("\nالمصادر:")
            for doc in sources:
                print(f"- الصفحة: {getattr(doc, 'metadata', {}).get('source', 'غير متوفر')}")


if __name__ == "__main__":
    main_lg()

