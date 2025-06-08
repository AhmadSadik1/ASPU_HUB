<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASPU HUB - Supervisor Dashboard</title>

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        /* Apply the Inter font family */
        body {
            font-family: 'Inter', sans-serif;
        }
        /* Custom scrollbar for better aesthetics */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background-color: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #6366f1;
            border-radius: 10px;
        }
    </style>
</head>
<body class="bg-gray-100">

    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar Navigation -->
        <aside class="flex flex-col w-64 bg-white shadow-lg">
            <div class="flex items-center justify-center h-20 shadow-md">
                <h1 class="text-2xl font-bold text-indigo-600">ASPU HUB</h1>
            </div>
            <nav class="flex-grow p-4 space-y-2">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center px-4 py-3 text-white bg-indigo-600 rounded-lg">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    Dashboard
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-600 transition duration-200 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Community Mgmt
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-600 transition duration-200 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10v-5m6 5v-5m0 0l-6-3m6 3l6-3"></path></svg>
                    Map Requests
                </a>
                <a href="#" class="flex items-center px-4 py-3 text-gray-600 transition duration-200 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    My Profile
                </a>
            </nav>
            <div class="p-4">
                 <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="flex items-center justify-center w-full px-4 py-3 font-semibold text-red-600 transition duration-200 bg-red-100 hover:bg-red-200 rounded-lg">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-8 overflow-y-auto">
            <h2 class="text-3xl font-bold text-gray-800">Welcome, {{ Auth::user()->first_name }}!</h2>
            <p class="mb-8 text-gray-600">Here's a summary of your activities.</p>

            <!-- Stats Cards with Dynamic Data -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div class="p-6 bg-white rounded-lg shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Post Reports</p>
                            <p class="text-3xl font-bold text-indigo-600">{{ $postReportsCount }}</p>
                        </div>
                        <div class="p-3 text-red-600 bg-red-100 rounded-full">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white rounded-lg shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Comment Reports</p>
                            <p class="text-3xl font-bold text-indigo-600">{{ $commentReportsCount }}</p>
                        </div>
                         <div class="p-3 text-yellow-600 bg-yellow-100 rounded-full">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        </div>
                    </div>
                </div>
                <div class="p-6 bg-white rounded-lg shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Pending Requests</p>
                            <p class="text-3xl font-bold text-indigo-600">{{ $pendingRequestsCount }}</p>
                        </div>
                        <div class="p-3 text-blue-600 bg-blue-100 rounded-full">
                             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    </div>
                </div>

                <!-- ✅ Supervised Groups Card (Corrected) -->
                <a href="{{ route('admin.communities.index') }}" class="block p-6 transition bg-white rounded-lg shadow-md hover:bg-gray-50">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Supervised Groups</p>
                            <p class="text-3xl font-bold text-indigo-600">{{ $supervisedGroupsCount }}</p>
                        </div>
                        <div class="p-3 text-green-600 bg-green-100 rounded-full">
                           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                    </div>
                </a>
                <a href="{{ route('admin.subjects.create') }}" class="flex flex-col items-center justify-center p-6 text-gray-600 bg-white rounded-lg shadow-md hover:bg-gray-50 hover:text-indigo-600">
                    <div class="p-3 mb-2 bg-indigo-100 rounded-full">
                        <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </div>
                    <span class="font-semibold">Add New Subject</span>
                </a>

                <a href="{{ route('admin.tags.create') }}" class="flex flex-col items-center justify-center p-6 text-gray-600 bg-white rounded-lg shadow-md hover:bg-gray-50 hover:text-indigo-600">
                    <div class="p-3 mb-2 bg-indigo-100 rounded-full">
                        <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </div>
                    <span class="font-semibold">Add New Tags</span>
                </a>
            </div>

            <!-- Recent Reports Table with Dynamic Data -->
            <div class="mt-10 bg-white rounded-lg shadow-md">
                <div class="p-4 border-b">
                    <h3 class="text-xl font-semibold text-gray-800">Recent Reports</h3>
                </div>
                <div class="p-4">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="text-xs font-semibold text-gray-500 uppercase border-b">
                                <th class="p-3">Reported Content</th>
                                <th class="p-3">Type</th>
                                <th class="p-3">Reporter</th>
                                <th class="p-3">Date</th>
                                <th class="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($recentReports as $report)
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="p-3 text-gray-700">
                                        @if ($report->reportable)
                                            "{{ Str::limit($report->reportable->title ?? $report->reportable->content, 50) }}"
                                        @else
                                            <span class="text-red-500 italic">[Content Deleted]</span>
                                        @endif
                                    </td>
                                    <td class="p-3 text-gray-700 capitalize">{{ Str::afterLast($report->reportable_type, '\\') }}</td>
                                    <td class="p-3 text-gray-700">{{ $report->reporter->first_name ?? 'N/A' }}</td>
                                    <td class="p-3 text-gray-500">{{ $report->created_at?->format('Y-m-d') }}</td>
                                    <td class="p-3 text-sm text-center">
                                        <a href="{{ route('admin.reports.show', $report->id) }}" class="px-3 py-1 font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200">View</a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="5" class="p-4 text-center text-gray-500">No pending reports found.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    </div>

</body>
</html>
