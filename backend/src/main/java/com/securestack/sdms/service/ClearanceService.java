package com.securestack.sdms.service;

import com.securestack.sdms.entity.ClearanceGate;
import com.securestack.sdms.entity.ReleaseRequest;
import com.securestack.sdms.enums.GateStatus;
import com.securestack.sdms.repository.ReleaseRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClearanceService {

    private final ReleaseRequestRepository releaseRequestRepository;

    @Transactional(readOnly = true)
    public List<ReleaseRequest> getAllRequests() {
        return releaseRequestRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<ReleaseRequest> getRequestById(String id) {
        return releaseRequestRepository.findById(id);
    }

    @Transactional
    public ReleaseRequest resolveGate(String requestId, int gateNumber, String officerName) {
        ReleaseRequest req = releaseRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Release request not found: " + requestId));

        for (ClearanceGate gate : req.getGates()) {
            if (gate.getGateNumber() == gateNumber) {
                gate.setStatus(GateStatus.CLEARED);
                gate.setOfficerName(officerName);
                gate.setHoldReason(null);
            }
            if (gate.getGateNumber() == gateNumber + 1 && Boolean.TRUE.equals(gate.getIsSequentiallyBlocked())) {
                gate.setIsSequentiallyBlocked(false);
                if (gate.getStatus() == GateStatus.NOT_STARTED) {
                    gate.setStatus(GateStatus.PENDING);
                }
            }
        }

        boolean allCleared = req.getGates().stream().allMatch(g -> g.getStatus() == GateStatus.CLEARED);
        if (allCleared) {
            req.setOverallStatus("APPROVED");
        }

        return releaseRequestRepository.save(req);
    }
}
