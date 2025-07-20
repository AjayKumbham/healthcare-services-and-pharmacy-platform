package com.test.test.Controller;


import com.test.test.Entity.Membership;
import com.test.test.Repository.MembershipRepository;
import com.test.test.Repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/auth")
public class MembershipController {

    @Autowired
    MembershipRepository membershipRepository;

    @Autowired
    PrescriptionRepository presciptionRepository;

    @GetMapping("/getMemberships")
    public ResponseEntity<List<Membership>> getMethodName() {
        List<Membership> memberships = membershipRepository.findAll();
        return new ResponseEntity<>(memberships, HttpStatus.OK);
    }
    
    
}
