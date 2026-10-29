package com.securestack.sdms.controller;

import com.securestack.sdms.dto.ApiResponse;
import com.securestack.sdms.entity.AuditEvent;
import com.securestack.sdms.service.AuditService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/audit")
@RequiredArgsConstructor
@Tag(name = "Immutable Audit Ledger", description = "SHA-256 Merkle-linked audit records and cryptographically verifiable ledger")
public class AuditController {

    private final AuditService auditService;

    @GetMapping("/events")
    @Operation(summary = "Get Audit Events", description = "Retrieves immutable audit events in reverse sequence order")
    public ResponseEntity<ApiResponse<List<AuditEvent>>> getEvents() {
        return ResponseEntity.ok(ApiResponse.ok(auditService.getAllAuditEvents()));
    }

    @PostMapping("/verify-chain")
    @Operation(summary = "Verify Audit Chain Integrity", description = "Recalculates and verifies the cryptographic SHA-256 chain across all records")
    public ResponseEntity<ApiResponse<Map<String, Object>>> verifyChain() {
        Map<String, Object> verification = auditService.verifyChainIntegrity();
        return ResponseEntity.ok(ApiResponse.ok(verification, "Cryptographic audit chain verification completed"));
    }
}
