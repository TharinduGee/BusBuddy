package com.example.BusBuddy.controllers;

import com.example.BusBuddy.services.RealTimeServices;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class RealTimeController {
    private RealTimeServices realTimeServices;

//    @GetMapping("/income-stream")
//    public ResponseEntity<Object> getIncomeStream(HttpServletRequest httpServletRequest) {
//        MediaType mediaType = MediaType.TEXT_EVENT_STREAM;
//        //SseEmitter sse = new SseEmitter();
//        return ResponseEntity.ok().contentType(mediaType)
//                .body(new SseEmitter(sse -> {
//                    try {
//                        while (true) {
//
//                            Double newIncome = realTimeServices.getIncome(httpServletRequest);
//                            sse.send("data: " + newIncome + "\n\n");
//                            Thread.sleep(1000); // Update interval
//                        }
//                    } catch (InterruptedException e) {
//                        // Handle interruption gracefully
//                    }
//                }));
//    }
}
