package com.example.checklist.repository;

import com.example.checklist.entity.Checks;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChecksRepository extends CrudRepository<Checks, Integer> {
    @Query(value = "select id from public.checks where name = :name ",
            nativeQuery = true)
    Integer findIdByCheckName(@Param("name") String name);

    @Query(value = "select * from public.checks where status=0",
            nativeQuery = true)
        List<Checks> findAllUnderway();

}
