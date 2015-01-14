package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/17.
 */
@Entity
@Table(name = "TAu_Authorization")
public class TAuAuthorizationEntity {
    private Integer id;
    private Boolean isEnabled;
    private TAuMenuInfoEntity tAuMenuInfoByMenuId;
    private TAuRoleInfoEntity tAuRoleInfoByRoleId;

    @Id
    @Column(name = "ID" )
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "IsEnabled")
    @GenericGenerator(name="system-uuid", strategy ="uuid")
    @GeneratedValue(generator="system-uuid")
    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TAuAuthorizationEntity that = (TAuAuthorizationEntity) o;

        if (id != that.id) return false;
        if (isEnabled != null ? !isEnabled.equals(that.isEnabled) : that.isEnabled != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (isEnabled != null ? isEnabled.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfoEntity getTAuMenuInfoByMenuId() {
        return tAuMenuInfoByMenuId;
    }

    public void setTAuMenuInfoByMenuId(TAuMenuInfoEntity tAuMenuInfoByMenuId) {
        this.tAuMenuInfoByMenuId = tAuMenuInfoByMenuId;
    }

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfoEntity getTAuRoleInfoByRoleId() {
        return tAuRoleInfoByRoleId;
    }

    public void setTAuRoleInfoByRoleId(TAuRoleInfoEntity tAuRoleInfoByRoleId) {
        this.tAuRoleInfoByRoleId = tAuRoleInfoByRoleId;
    }
}
