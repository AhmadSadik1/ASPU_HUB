@extends('layouts.admin')

@section('content')
    <h1>Tags</h1>
    <a href="{{ route('admin.tags.create') }}" class="btn btn-primary mb-3">Add New Tag</a>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <ul>
        @foreach($tags as $tag)
            <li>{{ $tag->name }}</li>
        @endforeach
    </ul>
@endsection
