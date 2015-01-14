package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/12/8.
 */
@Entity
@Table(name = "TAu_RoleInfo", schema = "dbo", catalog = "salesystem")
public class TAuRoleInfoEntity {
    private String roleId;
    private Integer id;
    private String roleName;
    private Short sortId;
    private Boolean state;
    private Collection<TAuAuthorizationEntity> tAuAuthorizationsByRoleId;
    private Collection<TAuOperInfoEntity> tAuOperInfosByRoleId;

    @Id
    @Column(name = "RoleID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "ID")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuRoleInfoEntity that = (TAuRoleInfoEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (roleId != null ? !roleId.equals(that.roleId) : that.roleId != null) return false;
        if (roleName != null ? !roleName.equals(that.roleName) : that.roleName != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = roleId != null ? roleId.hashCode() : 0;
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (roleName != null ? roleName.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "TAuRoleInfoByRoleId")
    public Collection<TAuAuthorizationEntity> getTAuAuthorizationsByRoleId() {
        return tAuAuthorizationsByRoleId;
    }

    public void setTAuAuthorizationsByRoleId(Collection<TAuAuthorizationEntity> tAuAuthorizationsByRoleId) {
        this.tAuAuthorizationsByRoleId = tAuAuthorizationsByRoleId;
    }

    @OneToMany(mappedBy = "TAuRoleInfoByRoleId")
    public Collection<TAuOperInfoEntity> getTAuOperInfosByRoleId() {
        return tAuOperInfosByRoleId;
    }

    public void setTAuOperInfosByRoleId(Collection<TAuOperInfoEntity> tAuOperInfosByRoleId) {
        this.tAuOperInfosByRoleId = tAuOperInfosByRoleId;
    }
}
