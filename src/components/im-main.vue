<template>
  <div>
    <lemon-imui
      :user="user"
      ref="IMUI"
      :contextmenu="contextmenu"
      :contact-contextmenu="contactContextmenu"
      :theme="theme"
      :hide-menu="hideMenu"
      :hide-menu-avatar="hideMenuAvatar"
      :hide-message-name="hideMessageName"
      :hide-message-time="hideMessageTime"
      @change-menu="handleChangeMenu"
      @change-contact="handleChangeContact"
      @pull-messages="handlePullMessages"
      @message-click="handleMessageClick"
      @menu-avatar-click="handleMenuAvatarClick"
      @send="handleSend"
      width='100%'
    >
      <template #cover>
        <div class="cover">
          <i class="lemon-icon-message"></i>
          <p><b>hello </b> 我是易木</p>
        </div>
      </template>
      <template #message-title="contact"> 
        <span>{{ contact.displayName }}</span>
        <small v-if="contact.id != 'admin'" class="more" @click="changeDrawer(contact, $refs.IMUI)">
          <i v-if="!drawerVisibleShow" class="el-icon-s-unfold"/>
          <i v-if="drawerVisibleShow" class="el-icon-s-fold"/>
        </small>
        <br/>
      </template>
    </lemon-imui>
    <el-dialog title="查看图片(可再次点击放大)" :visible.sync="outerVisible" width="500px">
      <el-image
          :src="imgUrl"
          :preview-src-list="srcList"
      >
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
import AddGroup from './AddGroup.vue'
import CreateGroup from "./CreateGroup";
import groupInfo from './groupInfo'
import { Dialog, Image, Message } from 'element-ui';
import testComponent from './testComponent.vue'
const getTime = () => {
  return new Date().getTime();
};
const generateRandId = () => {
  return Math.random()
    .toString(36)
    .substr(-8);
};
import { getUserByOrgid, uploadFile } from '../api/data'
  export default {
    name: 'imMain',
    props: {
      messageList: {
        type: Array,
        default: () => []
      },
      currentUser: {
        type: Object,
        default: () => {}
      },
      baseUrl: {
        type: String,
        default: 'https://im.shandian8.com'
      },
      menuList: {
        type: Array,
        default: () => [
          {name: 'messages', isBottom: false}, 
          {name: 'contacts', isBottom: false}, 
          {name: 'createGroup', isBottom: true}, 
          {name: 'files', isBottom: false, title: '文档', unread: 0, key: 'test', component: {test: testComponent}}]
      },
      firstConversationId: String || undefined,
    },
    data() {
      return {
        contextmenu: [
          
          {
            visible: instance => {
              return instance.message.fromUser.id != this.user.id;
            },
            text: "举报",
          },
          {
            text: "转发",
          },
          {
            visible: instance => {
              return instance.message.type == "text";
            },
            text: "复制文字",
          },
          {
            visible: instance => {
              return instance.message.type == "image";
            },
            text: "下载图片",
          },
          {
            visible: instance => {
              return instance.message.type == "file";
            },
            text: "下载文件",
          },
          {
            click: (e, instance, hide) => {
              const { IMUI, message } = instance;
              IMUI.removeMessage(message.id);
              hide();
            },
            icon: "lemon-icon-folder",
            color: "red",
            text: "删除",
          },
        ],
        contactContextmenu: [
          {
            text: "删除该聊天",
            click: (e, instance, hide) => {
              const { IMUI, contact } = instance;
              IMUI.updateContact({
                id: contact.id,
                lastContent: null,
              });
              if (IMUI.currentContactId == contact.id) IMUI.changeContact(null);
              hide();
            },
          },
          {
            text: "设置备注和标签",
          },
          {
            click(e, instance, hide) {
              const { IMUI, contact } = instance;
              IMUI.removeContact(contact.id);
              if (IMUI.currentContactId == contact.id) IMUI.changeContact(null);
              hide();
            },
            color: "red",
            text: "删除好友",
          },
        ],
        theme: "default",
        hideMenuAvatar: false,
        hideMenu: false,
        hideMessageName: false,
        hideMessageTime: true,
        user: {
          id: this.currentUser.id || 1,
          displayName: this.currentUser.nickname || '',
          orgid: this.currentUser.orgid || ''
        },
        show_message_list: this.messageList,
        targetUser: {},
        //右侧抽屉
        drawerVisibleShow: true,
        // 新增组
        addGroupOpen: false,
        outerVisible: false,
        imgUrl: undefined,
        srcList: undefined,
        my_baseUrl: this.baseUrl,

        //联系人列表
        all_users: []
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>