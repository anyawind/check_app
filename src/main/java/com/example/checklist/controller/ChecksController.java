package com.example.checklist.controller;

import com.example.checklist.dto.ChecklistDto;
import com.example.checklist.entity.Checklist;
import com.example.checklist.entity.Checks;
import com.example.checklist.repository.ChecklistRepository;
import com.example.checklist.repository.ChecksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/checks")
public class ChecksController {
    @Autowired
    ChecksRepository checksRepository;
    @Autowired
    ChecklistRepository checklistRepository;

    @GetMapping("/")
    public List<Checks> getListCheks() {
        List<Checks> list = StreamSupport.stream(checksRepository.findAllNotInArchive().spliterator(), false)
                .collect(Collectors.toList());
        return list;
    }

    @GetMapping("/getname")
    public List<String> getListChekNames() {
   //     List<Checks> list = StreamSupport.stream(cheksRepository.findAll().spliterator(), false)
    //            .collect(Collectors.toList());
        List<Checks> list = StreamSupport.stream(checksRepository.findAllNotInArchive().spliterator(), false)
                .collect(Collectors.toList());
        List<String> listn = new ArrayList<>();
        for (Checks ch : list) {
            listn.add(ch.getNameCh());
        }
        return listn;
    }

    @RequestMapping(value = "new", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Checks> create(
            @RequestBody Checks obj) {
        obj.setArchive(0);
        obj.setStatus(0);
        Checks checks = checksRepository.save(obj);
        return ResponseEntity.ok().body(checks);
    }

    @GetMapping("/getchecklist")
    public List<Checklist> getChecklist(@RequestParam(name = "id") String id) {
        return checklistRepository.findByCheckId(Integer.valueOf(id));
    }

    @RequestMapping(value = "newchecklist", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Checklist> createchecklist(
            @RequestBody Checklist obj,@RequestParam(name = "chname") String chname) {
        obj.setIdch(checksRepository.findIdByCheckName(chname));
        obj.setStatus(0);
        Checklist checks = checklistRepository.save(obj);
        return ResponseEntity.ok().body(checks);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Checklist> update(
            @PathVariable("id") Checklist dbObj,
            @RequestBody ChecklistDto obj)
    {
        Checklist checklist = null;

        System.out.println(obj.getStatus());
        System.out.println(dbObj.getStatus());

        Integer status = obj.getStatus();
        Integer statusDB = dbObj.getStatus();

        String comment = obj.getComment();
        String commentDB = dbObj.getComment();

        if(status!=statusDB) {
            dbObj.setStatus(obj.getStatus());
        }

        if(comment!=commentDB) {
            dbObj.setComment(obj.getComment());
        }

        checklist = checklistRepository.save(dbObj);

        if(checklistRepository.findByCheckIdProcessing(obj.getIdch()) == 0){
            Optional<Checks> optionalchecks = checksRepository.findById(obj.getIdch());
            Checks checks = optionalchecks.get();
            checks.setArchive(1);
            checks.setStatus(1);
            checksRepository.save(checks);
        }
        return ResponseEntity.ok().body(checklist);
    }


}

