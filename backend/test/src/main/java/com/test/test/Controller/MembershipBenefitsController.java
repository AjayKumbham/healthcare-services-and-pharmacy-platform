package com.test.test.Controller;


import com.test.test.DTO.MembershipInfoDTO;
import com.test.test.Entity.MembershipBenefits;
import com.test.test.Repository.MembershipBenefitsRepository;
import com.test.test.Repository.MembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/auth")
public class MembershipBenefitsController {
    
    @Autowired
    MembershipBenefitsRepository membershipBenefitsRepository;

    @Autowired
    MembershipRepository membershipRepository;

    @GetMapping("/getMembershipPlans")
    public ResponseEntity<List<MembershipInfoDTO>> getMethodName() {
        List<MembershipBenefits> memberships = membershipBenefitsRepository.findAll();

        HashMap<Long, MembershipInfoDTO> map = new HashMap<>();

        for(MembershipBenefits mb : memberships) {
            if ( !map.containsKey(mb.getMembership().getId()) ) {
               MembershipInfoDTO membershipInfo = new MembershipInfoDTO();
               membershipInfo.setMembership(mb.getMembership());
               membershipInfo.setMembershipBenefits(new ArrayList<>());
                map.put(mb.getMembership().getId(), membershipInfo);
            }
            MembershipInfoDTO membershipInfo = map.get(mb.getMembership().getId());
            membershipInfo.getMembershipBenefits().add(mb.getBenefit());
        }

        List<MembershipInfoDTO> infoList = new ArrayList<>();

        for(Long key : map.keySet()) {
            infoList.add(map.get(key));
        }

        return new ResponseEntity<>(infoList, HttpStatus.OK);
    }

}
