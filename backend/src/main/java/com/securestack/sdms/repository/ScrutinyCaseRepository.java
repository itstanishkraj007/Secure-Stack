package com.securestack.sdms.repository;

import com.securestack.sdms.entity.ScrutinyCase;
import com.securestack.sdms.enums.ScrutinyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrutinyCaseRepository extends JpaRepository<ScrutinyCase, String> {
    List<ScrutinyCase> findByStatus(ScrutinyStatus status);
    List<ScrutinyCase> findByAssignedTo(String assignedTo);
}
