package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.TreeDAO;
import com.shinowit.entity.TreeNode;

import javax.annotation.Resource;

public class TreeShowSelectAction extends ActionSupport {
    @Resource
    private TreeDAO treedao;

    private TreeNode node;

    private boolean success;

    private int selectrolcode ;

    public String selectshowtreelist(){

        node=treedao.queryPower(selectrolcode);

        if(node!=null){
            setSuccess(true);
        }
        return "sstreel";
    }

    public TreeNode getNode() {
        return node;
    }

    public void setNode(TreeNode node) {
        this.node = node;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getSelectrolcode() {
        return selectrolcode;
    }

    public void setSelectrolcode(int selectrolcode) {
        this.selectrolcode = selectrolcode;
    }
}
