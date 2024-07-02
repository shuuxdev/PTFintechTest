
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using PTFintechTest.Contexts;
using PTFintechTest.DTOs.Request;
using PTFintechTest.Models;
using PTFintechTest.Repositories;

namespace PTFintechTest.Services
{
    public class TaskService
    {
        private readonly TaskRepository taskRepo;
        private readonly IMapper mapper;
        private readonly LabelRepository labelRepository;
        private readonly TaskManagementSystemContext context;
        private readonly UserRepository userRepository;

        public TaskService(TaskRepository taskRepo, IMapper mapper, LabelRepository labelRepository, TaskManagementSystemContext context, UserRepository userRepository)
        {
            this.taskRepo = taskRepo;
            this.mapper = mapper;
            this.labelRepository = labelRepository;
            this.context = context;
            this.userRepository = userRepository;
        }
        public async Task<List<Models.Task>> GetAllTasks()
        {
            var tasks = await taskRepo.Get();

            return tasks.ToList();
        }
        public async Task<List<Models.Task>> GetAssignedTask(int userId)
        {
            var tasks = await taskRepo.Get(filter: (task) => task.AssignedTo == userId, includeProperties: "Labels");
            var assingedTasks = tasks.ToList();

            return assingedTasks;
        }
        public async Task<List<Models.Task>> GetTasksByTitle(string keyword)
        {
            var tasks = await taskRepo.Get(filter: (task) => task.Title.Contains(keyword));

            return tasks.ToList();
        }
        public async Task<Models.Task> GetTaskById(int taskId)
        {
            var task = await taskRepo.GetById(taskId);

            return task;
        }
        public async System.Threading.Tasks.Task<Models.Task> CreateTask(CreateTaskRequest createTaskRequest)
        {

            // Map CreateTaskRequest to Task
            var task = mapper.Map<Models.Task>(createTaskRequest);

            if (createTaskRequest.Labels != null)
            {
                var labelIds = createTaskRequest.Labels.Select(label => label.LabelId);

                var labels = await labelRepository.Get(label => labelIds.Contains(label.LabelId));

                task.Labels = labels.ToList();
            }


            await taskRepo.Insert(task);

            return task;
        }
        public async System.Threading.Tasks.Task DeleteTask(int taskId)
        {
            var task = await taskRepo.GetById(taskId);

            if (task == null)
            {
                throw new Exception("Task not found");
            }


            await taskRepo.Delete(taskId);
        }
        public async System.Threading.Tasks.Task AssignTask(AssignTaskRequest request)
        {
            var task = (await taskRepo.Get(task => task.TaskId == request.TaskId)).FirstOrDefault();

            if (task == null)
            {
                throw new Exception("Task not found");
            }

            var user = (await userRepository.Get(user => user.UserId == request.AssignedTo)).FirstOrDefault();

            if (user == null)
            {
                throw new Exception("User not exists");
            }

            task.AssignedTo = user.UserId;
            await context.SaveChangesAsync();
        }
        public async System.Threading.Tasks.Task UpdateTask(UpdateTaskRequest request)
        {
            var task = await context.Tasks.Include(t => t.Labels).FirstOrDefaultAsync(t => t.TaskId == request.TaskId);

            if (task == null)
            {
                throw new Exception("Task not found");
            }

            mapper.Map(request, task);

            //Handle the case for adding Labels
            if (request.Labels != null && task.Labels != null)
            {
                task.Labels.Clear();
                foreach (var labelDto in request.Labels)
                {
                    var label = await context.Labels.FindAsync(labelDto.LabelId);
                    if (label != null)
                    {
                        task.Labels.Add(label);
                    }
                }
            }

            await context.SaveChangesAsync();
        }
    }
}