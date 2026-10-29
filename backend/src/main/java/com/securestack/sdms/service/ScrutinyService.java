package com.securestack.sdms.service;

import com.securestack.sdms.entity.ScrutinyCase;
import com.securestack.sdms.enums.ScrutinyStatus;
import com.securestack.sdms.repository.ScrutinyCaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScrutinyService {

    private final ScrutinyCaseRepository scrutinyCaseRepository;

    @Transactional(readOnly = true)
    public List<ScrutinyCase> getAllCases() {
        return scrutinyCaseRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<ScrutinyCase> getCaseById(String id) {
        return scrutinyCaseRepository.findById(id);
    }

    @Transactional
    public ScrutinyCase updateCaseStatus(String id, ScrutinyStatus newStatus) {
        ScrutinyCase sc = scrutinyCaseRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Scrutiny case not found: " + id));
        sc.setStatus(newStatus);
        return scrutinyCaseRepository.save(sc);
    }
}
