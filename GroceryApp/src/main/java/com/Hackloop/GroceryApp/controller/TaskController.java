package com.Hackloop.GroceryApp.controller;

import com.Hackloop.GroceryApp.mapper.UrlMapping;
import com.Hackloop.GroceryApp.model.Task;
import com.Hackloop.GroceryApp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping(UrlMapping.GET_ALL_TASKS)
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTask());
    }

    @GetMapping(UrlMapping.GET_ALL_COMPLETED_TASKS)
    public ResponseEntity<List<Task>> getAllCompletedTasks() {
        return ResponseEntity.ok(taskService.findAllCompletedTask());
    }

    @GetMapping(UrlMapping.GET_ALL_INCOMPLETE_TASKS)
    public ResponseEntity<List<Task>> getAllIncompleteTasks() {
        return ResponseEntity.ok(taskService.findAllInCompleteTask());
    }

    @PostMapping(UrlMapping.CREATE_TASK)
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.createNewTask(task));
    }

    @PutMapping(UrlMapping.UPDATE_TASK)
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        return ResponseEntity.ok(taskService.updateTask(task));
    }

    @DeleteMapping(UrlMapping.DELETE_TASK)
    public ResponseEntity<Boolean> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(true);
    }
}
