package com.ziyad.securenotetakingapplication.repository;

import com.ziyad.securenotetakingapplication.config.AppRole;
import com.ziyad.securenotetakingapplication.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {


    Optional<Role> findByRoleName(AppRole roleName);
}
