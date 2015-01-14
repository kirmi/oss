package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/17.
 */
@Entity
@Table(name = "TBa_MemberInfo")
public class TBaMemberInfoEntity {
    private int id;
    private String userName;
    private String pwd;
    private String email;
    private String lName;
    private BigDecimal balance;
    private Boolean status;
    private Timestamp regDate;
    private Timestamp activeDate;
    private String remark;
    private Collection<TBaMembeAddrInfoEntity> tBaMembeAddrInfosByUserName;
    private Collection<TBaSupplyRecordInfoEntity> tBaSupplyRecordInfosByUserName;
    private Collection<TMeOrderInfoEntity> tMeOrderInfosByUserName;

    @Basic
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "UserName")
    @GenericGenerator(name="system-uuid", strategy ="uuid")
    @GeneratedValue(generator="system-uuid")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "lName")
    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    @Basic
    @Column(name = "Balance")
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "RegDate")
    public Timestamp getRegDate() {
        return regDate;
    }

    public void setRegDate(Timestamp regDate) {
        this.regDate = regDate;
    }

    @Basic
    @Column(name = "ActiveDate")
    public Timestamp getActiveDate() {
        return activeDate;
    }

    public void setActiveDate(Timestamp activeDate) {
        this.activeDate = activeDate;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TBaMemberInfoEntity that = (TBaMemberInfoEntity) o;

        if (id != that.id) return false;
        if (activeDate != null ? !activeDate.equals(that.activeDate) : that.activeDate != null) return false;
        if (balance != null ? !balance.equals(that.balance) : that.balance != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (lName != null ? !lName.equals(that.lName) : that.lName != null) return false;
        if (pwd != null ? !pwd.equals(that.pwd) : that.pwd != null) return false;
        if (regDate != null ? !regDate.equals(that.regDate) : that.regDate != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (userName != null ? !userName.equals(that.userName) : that.userName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        result = 31 * result + (pwd != null ? pwd.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (lName != null ? lName.hashCode() : 0);
        result = 31 * result + (balance != null ? balance.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (regDate != null ? regDate.hashCode() : 0);
        result = 31 * result + (activeDate != null ? activeDate.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName")
    public Collection<TBaMembeAddrInfoEntity> getTBaMembeAddrInfosByUserName() {
        return tBaMembeAddrInfosByUserName;
    }

    public void setTBaMembeAddrInfosByUserName(Collection<TBaMembeAddrInfoEntity> tBaMembeAddrInfosByUserName) {
        this.tBaMembeAddrInfosByUserName = tBaMembeAddrInfosByUserName;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName")
    public Collection<TBaSupplyRecordInfoEntity> getTBaSupplyRecordInfosByUserName() {
        return tBaSupplyRecordInfosByUserName;
    }

    public void setTBaSupplyRecordInfosByUserName(Collection<TBaSupplyRecordInfoEntity> tBaSupplyRecordInfosByUserName) {
        this.tBaSupplyRecordInfosByUserName = tBaSupplyRecordInfosByUserName;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName")
    public Collection<TMeOrderInfoEntity> getTMeOrderInfosByUserName() {
        return tMeOrderInfosByUserName;
    }

    public void setTMeOrderInfosByUserName(Collection<TMeOrderInfoEntity> tMeOrderInfosByUserName) {
        this.tMeOrderInfosByUserName = tMeOrderInfosByUserName;
    }
}
