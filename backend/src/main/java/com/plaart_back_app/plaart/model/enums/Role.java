package com.plaart_back_app.plaart.model.enums;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Role {
    ADMIN(Set.of(
            Permission.ADMIN_READ,
            Permission.ADMIN_UPDATE,
            Permission.ADMIN_DELETE,
            Permission.ADMIN_CREATE,
            Permission.MANAGER_READ,
            Permission.MANAGER_UPDATE,
            Permission.MANAGER_DELETE,
            Permission.MANAGER_CREATE,
            Permission.USER_READ,
            Permission.USER_UPDATE,
            Permission.USER_DELETE,
            Permission.USER_CREATE)),

    MANAGER(Set.of(
            Permission.MANAGER_READ,
            Permission.MANAGER_UPDATE,
            Permission.MANAGER_DELETE,
            Permission.MANAGER_CREATE,
            Permission.USER_READ,
            Permission.USER_UPDATE,
            Permission.USER_DELETE,
            Permission.USER_CREATE)),

    USER(Set.of(
            Permission.USER_READ,
            Permission.USER_UPDATE,
            Permission.USER_DELETE,
            Permission.USER_CREATE));

    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        // Convert permissions to SimpleGrantedAuthority
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
