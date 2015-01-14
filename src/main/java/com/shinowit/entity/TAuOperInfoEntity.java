package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/12/15.
 */
@Entity
@Table(name = "TAu_OperInfo")
public class TAuOperInfoEntity {
    private String operId;
    private String address;
    private String email;
    private Short id;
    private String linkTel;
    private String mobile;
    private String operName;
    private String pwd;
    private String qq;
    private Short sortId;
    private Boolean state;
    private TAuRoleInfoEntity tAuRoleInfoByRoleId;
//    private Collection<TBaLogInfoEntity> tBaLogInfosByOperId;
    private Collection<TMeInStockInfoEntity> tMeInStockInfosByOperId;
    private Collection<TMeOrderInfoEntity> tMeOrderInfosByOperId;
    private Collection<TMeOutStockInfoEntity> tMeOutStockInfosByOperId;

    @Id
    @Column(name = "OperID")
    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }

    @Basic
    @Column(name = "Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "ID")
    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "Mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "OperName")
    public String getOperName() {
        return operName;
    }

    public void setOperName(String operName) {
        this.operName = operName;
    }

    @Basic
    @Column(name = "Pwd")
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Basic
    @Column(name = "QQ")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
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

        TAuOperInfoEntity that = (TAuOperInfoEntity) o;

        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (linkTel != null ? !linkTel.equals(that.linkTel) : that.linkTel != null) return false;
        if (mobile != null ? !mobile.equals(that.mobile) : that.mobile != null) return false;
        if (operId != null ? !operId.equals(that.operId) : that.operId != null) return false;
        if (operName != null ? !operName.equals(that.operName) : that.operName != null) return false;
        if (pwd != null ? !pwd.equals(that.pwd) : that.pwd != null) return false;
        if (qq != null ? !qq.equals(that.qq) : that.qq != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (state != null ? !state.equals(that.state) : that.state != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = operId != null ? operId.hashCode() : 0;
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (linkTel != null ? linkTel.hashCode() : 0);
        result = 31 * result + (mobile != null ? mobile.hashCode() : 0);
        result = 31 * result + (operName != null ? operName.hashCode() : 0);
        result = 31 * result + (pwd != null ? pwd.hashCode() : 0);
        result = 31 * result + (qq != null ? qq.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfoEntity getTAuRoleInfoByRoleId() {
        return tAuRoleInfoByRoleId;
    }

    public void setTAuRoleInfoByRoleId(TAuRoleInfoEntity tAuRoleInfoByRoleId) {
        this.tAuRoleInfoByRoleId = tAuRoleInfoByRoleId;
    }

//    @OneToMany(mappedBy = "TAuOperInfoByOperId")
//    public Collection<TBaLogInfoEntity> getTBaLogInfosByOperId() {
//        return tBaLogInfosByOperId;
//    }
//
//    public void setTBaLogInfosByOperId(Collection<TBaLogInfoEntity> tBaLogInfosByOperId) {
//        this.tBaLogInfosByOperId = tBaLogInfosByOperId;
//    }

    @OneToMany(mappedBy = "TAuOperInfoByOperId")
    public Collection<TMeInStockInfoEntity> getTMeInStockInfosByOperId() {
        return tMeInStockInfosByOperId;
    }

    public void setTMeInStockInfosByOperId(Collection<TMeInStockInfoEntity> tMeInStockInfosByOperId) {
        this.tMeInStockInfosByOperId = tMeInStockInfosByOperId;
    }

    @OneToMany(mappedBy = "TAuOperInfoByOperId")
    public Collection<TMeOrderInfoEntity> getTMeOrderInfosByOperId() {
        return tMeOrderInfosByOperId;
    }

    public void setTMeOrderInfosByOperId(Collection<TMeOrderInfoEntity> tMeOrderInfosByOperId) {
        this.tMeOrderInfosByOperId = tMeOrderInfosByOperId;
    }

    @OneToMany(mappedBy = "TAuOperInfoByOperId")
    public Collection<TMeOutStockInfoEntity> getTMeOutStockInfosByOperId() {
        return tMeOutStockInfosByOperId;
    }

    public void setTMeOutStockInfosByOperId(Collection<TMeOutStockInfoEntity> tMeOutStockInfosByOperId) {
        this.tMeOutStockInfosByOperId = tMeOutStockInfosByOperId;
    }
}
