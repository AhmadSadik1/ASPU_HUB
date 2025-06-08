@extends('layouts.admin')

@section('title', 'Add New Subject')

@section('content')
<main class="flex-1 p-8">
    <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800">Add New Subject</h2>
        <a href="{{ route('admin.dashboard') }}" class="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200">
            &larr; Back to Dashboard
        </a>
    </div>

    <div class="p-8 bg-white rounded-lg shadow-md">
        <form action="{{ route('admin.subjects.store') }}" method="POST">
            @csrf
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <!-- Subject Name -->
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Subject Name</label>
                    <input type="text" name="name" id="name" required class="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>

                <!-- Hour Count -->
                <div>
                    <label for="hour_count" class="block mb-2 text-sm font-medium text-gray-700">Hour Count</label>
                    <input type="number" name="hour_count" id="hour_count" required class="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>

                <!-- Specialization -->
                <div class="md:col-span-2">
                    <label for="SpecializationID" class="block mb-2 text-sm font-medium text-gray-700">Specialization</label>
                    <select name="SpecializationID" id="SpecializationID" required class="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Select a specialization</option>
                        @foreach($specializations as $spec)
                            <option value="{{ $spec->SpecializationID }}">{{ $spec->name }}</option>
                        @endforeach
                    </select>
                </div>

                <!-- Description -->
                <div class="md:col-span-2">
                    <label for="Description" class="block mb-2 text-sm font-medium text-gray-700">Description</label>
                    <textarea name="Description" id="Description" rows="4" class="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-6">
                <button type="submit" class="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg md:w-auto hover:bg-indigo-700">Create Subject</button>
            </div>
        </form>
    </div>
</main>
@endsection
