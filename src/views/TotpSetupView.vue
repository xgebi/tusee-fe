<template>
  <main class="page page-totp-setup">
    <section>
      <form v-on:submit="confirmTotp">
        <img src="" alt="" />
        <label for="confirm-code">Confirm code</label>
        <input
          type="text"
          name="confirm-code"
          id="confirm-code"
          v-model="confirmCode"
        />
        <button @click="confirmTotp">Confirm</button>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';

type TotpSetupState = {
  confirmCode: string;
};

export default defineComponent({
  name: 'TotpSetupView',
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      confirmCode: '',
    } as TotpSetupState;
  },
  methods: {
    async confirmTotp(e: Event) {
      e.preventDefault();
      await this.userStore.confirmTotp(this.confirmCode);
      if (
        this.userStore.token?.mfaEnabled &&
        !this.userStore.token?.firstLogin
      ) {
        this.$router.push({ name: 'dashboard' });
      }
    },
  },
});
</script>

<style scoped lang="scss">
@import '../assets/user-modals.scss';
</style>
