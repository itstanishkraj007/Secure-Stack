package com.securestack.sdms.repository;

import com.securestack.sdms.entity.ReleaseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReleaseRequestRepository extends JpaRepository<ReleaseRequest, String> {
    List<ReleaseRequest> findByOverallStatus(String overallStatus);
}
