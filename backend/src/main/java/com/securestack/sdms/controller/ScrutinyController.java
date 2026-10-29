package com.securestack.sdms.controller;

import com.securestack.sdms.dto.ApiResponse;
import com.securestack.sdms.entity.ScrutinyCase;
import com.securestack.sdms.enums.ScrutinyStatus;
import com.securestack.sdms.service.ScrutinyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scrutiny")
@RequiredArgsConstructor
@Tag(name = "Scrutiny & Discrepancies", description = "Scrutiny Case management and discrepancy resolution")
public class ScrutinyController {

    private final ScrutinyService scrutinyService;

    @GetMapping("/cases")
    @Operation(summary = "List Scrutiny Cases", description = "Retrieves all scrutiny cases queued for officer review")
    public ResponseEntity<ApiResponse<List<ScrutinyCase>>> listCases() {
        return ResponseEntity.ok(ApiResponse.ok(scrutinyService.getAllCases()));
    }

    @GetMapping("/cases/{id}")
    @Operation(summary = "Get Scrutiny Case Details")
    public ResponseEntity<ApiResponse<ScrutinyCase>> getCase(@PathVariable String id) {
        return scrutinyService.getCaseById(id)
                .map(c -> ResponseEntity.ok(ApiResponse.ok(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/cases/{id}/status")
    @Operation(summary = "Update Scrutiny Case Status")
    public ResponseEntity<ApiResponse<ScrutinyCase>> updateStatus(
            @PathVariable String id,
            @RequestParam ScrutinyStatus status) {
        ScrutinyCase updated = scrutinyService.updateCaseStatus(id, status);
        return ResponseEntity.ok(ApiResponse.ok(updated, "Status updated successfully"));
    }
}
