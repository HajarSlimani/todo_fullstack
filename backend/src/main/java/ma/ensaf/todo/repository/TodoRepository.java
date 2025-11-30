package ma.ensaf.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.ensaf.todo.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
