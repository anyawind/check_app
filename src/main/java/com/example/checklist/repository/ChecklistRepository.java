package com.example.checklist.repository;

import com.example.checklist.entity.Checklist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChecklistRepository extends CrudRepository<Checklist, Integer> {
    @Query(value = "select * from public.checklist where idch = :id ",
            nativeQuery = true)
    List<Checklist> findByCheckId(@Param("id") Integer id);

    @Query(value = "select count(id) from public.checklist where idch = :id and status=0",
            nativeQuery = true)
    Integer findByCheckIdProcessing(@Param("id") Integer id);
}