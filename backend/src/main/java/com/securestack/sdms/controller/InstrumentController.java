package com.securestack.sdms.controller;

import com.securestack.sdms.dto.ApiResponse;
import com.securestack.sdms.entity.Instrument;
import com.securestack.sdms.service.InstrumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/instruments")
@RequiredArgsConstructor
@Tag(name = "Instruments", description = "Fixed Deposit Receipt (FDR) and Security Deposit CRUD & Query APIs")
public class InstrumentController {

    private final InstrumentService instrumentService;

    @GetMapping
    @Operation(summary = "Get All Instruments", description = "Retrieves all security deposit instruments across institutions")
    public ResponseEntity<ApiResponse<List<Instrument>>> getAllInstruments() {
        return ResponseEntity.ok(ApiResponse.ok(instrumentService.getAllInstruments()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Instrument by ID")
    public ResponseEntity<ApiResponse<Instrument>> getInstrumentById(@PathVariable String id) {
        return instrumentService.getInstrumentById(id)
                .map(ins -> ResponseEntity.ok(ApiResponse.ok(ins)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Register / Submit Instrument", description = "Creates a new FDR security deposit instrument into the lifecycle")
    public ResponseEntity<ApiResponse<Instrument>> createInstrument(@RequestBody Instrument instrument) {
        Instrument created = instrumentService.saveInstrument(instrument);
        return ResponseEntity.ok(ApiResponse.ok(created, "Instrument created successfully"));
    }

    @GetMapping("/expiring-soon")
    @Operation(summary = "Get Expiring Soon Instruments", description = "Returns instruments expiring within the T-30 threshold")
    public ResponseEntity<ApiResponse<List<Instrument>>> getExpiringSoon() {
        return ResponseEntity.ok(ApiResponse.ok(instrumentService.getExpiringSoon()));
    }
}
