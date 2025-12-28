from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Task
import json
from django.http import JsonResponse, Http404

def home(request):
    return HttpResponse("<h1>SmartTask API</h1><p>Visit /tasks/</p>")

@csrf_exempt
def task_list(request):
    if request.method == "GET":
        tasks = list(Task.objects.values())
        return JsonResponse(tasks, safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            title = data.get("title")

            if not title:
                return JsonResponse({"error": "Title is required"}, status=400)

            task = Task.objects.create(title=title)
            return JsonResponse({
                "id": task.id,
                "title": task.title,
                "completed": task.completed
            }, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

def task_detail(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        raise Http404("Task not found")

    return JsonResponse({
        "id": task.id,
        "title": task.title,
        "completed": task.completed
    })

@csrf_exempt
def task_toggle(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        raise Http404("Task not found")

    if request.method == "POST":
        task.completed = not task.completed
        task.save()
        return JsonResponse({"id": task.id, "completed": task.completed})

@csrf_exempt
def task_delete(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        raise Http404("Task not found")

    if request.method == "DELETE":
        task.delete()
        return JsonResponse({"deleted": True})
