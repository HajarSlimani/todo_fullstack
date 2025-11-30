package ma.ensaf.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.ensaf.todo.entity.Todo;
import ma.ensaf.todo.repository.TodoRepository;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository repository;

    public List<Todo> findAll() {
        return repository.findAll();
    }

    public Todo create(Todo todo) {
        return repository.save(todo);
    }

    public Todo update(Long id, Todo todo) {
        todo.setId(id);
        return repository.save(todo);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Todo findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));
    }
}
