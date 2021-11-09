<template>
  <v-layout row wrap>
    <v-menu
      v-model="fromDateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          label="From Date"
          prepend-icon="event"
          readonly
          :value="fromDateDisp"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        locale="en-in"
        no-title
        v-model="content"
        @input="dateInput"
      ></v-date-picker>
    </v-menu>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        fromDateMenu: false,
        content: this.value
      };
    },
    prop: ['value'],
    computed: {
        fromDateDisp() {
            if (this.content) {
                return this.$moment(String(this.content)).format("DD/MM/YYYY");
            }
            return "";
        }
    },
    methods: {
        dateInput() {
            this.fromDateMenu = false;
            // this.$emit('input', this.$moment(String(this.content)).format("DD/MM/YYYY"));
            this.$emit('input', this.content);
        }
    }
  };
</script>
