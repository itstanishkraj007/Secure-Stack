package com.securestack.sdms.repository;

import com.securestack.sdms.entity.AuditEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditEventRepository extends JpaRepository<AuditEvent, String> {
    List<AuditEvent> findAllByOrderBySequenceNumberDesc();
}
