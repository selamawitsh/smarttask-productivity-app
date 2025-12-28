from django.http import JsonResponse, HttpResponse, Http404

# Minimal in-memory sample tasks. Replace with DB models in the future.
SAMPLE_TASKS = [
    {"id": 1, "title": "Buy groceries", "completed": False, "due_date": ""},
    {"id": 2, "title": "Write project README", "completed": True, "due_date": ""},
]


def home(request):
    return HttpResponse("<h1>SmartTask API</h1><p>Visit /tasks/ for sample data.</p>")


def about(request):
    return HttpResponse("<h1>About SmartTask</h1><p>Minimal productivity app template.</p>")


def task_list(request):
    # Return the sample tasks as JSON
    return JsonResponse(SAMPLE_TASKS, safe=False)


def task_detail(request, task_id: int):
    for t in SAMPLE_TASKS:
        if t["id"] == task_id:
            return JsonResponse(t)
    raise Http404("Task not found")
