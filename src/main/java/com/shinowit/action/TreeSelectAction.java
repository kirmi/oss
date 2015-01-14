package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.TreeDAO;
import com.shinowit.entity.TreeNode;

import javax.annotation.Resource;

public class TreeSelectAction extends ActionSupport {
    @Resource
    private TreeDAO treedao;

    private TreeNode node;

    private boolean success;

    public String showtreelist(){

        node=treedao.queryPower(1);

        if(node!=null){
            setSuccess(true);
        }
        return "treel";
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
}
