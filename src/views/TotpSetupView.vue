<template>
  <main class="page page-totp-setup">
    <section>
      <form v-on:submit="confirmTotp">
        <canvas id="canvas" ref="canvas"></canvas>
        <p>Totp secret: {{ userStore.token.totpSecret }}</p>
        <label for="confirm-code">Confirm code</label>
        <input
          type="text"
          name="confirm-code"
          id="confirm-code"
          v-model="confirmCode"
        />
        <button @click="confirmTotp">Confirm</button>
        <button @click="skip">Skip</button>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import QRCode from 'qrcode';

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
      await this.userStore.setupTotp(this.confirmCode);
      if (
        this.userStore.getToken.usesTotp &&
        !this.userStore.getToken.firstLogin
      ) {
        await this.$router.push({ name: 'dashboard' });
      }
    },
    async skip(e: Event) {
      e.preventDefault();
      await this.userStore.skipTotp();
      await this.$router.push({ name: 'dashboard' });
    },
  },
  mounted() {
    QRCode.toCanvas(
      this.$refs.canvas,
      `otpauth://totp/${window.location.hostname}?secret=${this.userStore.getToken.totpSecret}&issuer=tusee&digits=1`,
      function (error: Error) {
        if (error) console.error(error);
      }
    );
  },
});
</script>

<style scoped lang="scss">
@import '../assets/user-modals.scss';
</style>
