<template>
    <div class="content-centered contact-list-container">
        <div class="indicators">

        </div>
        <div class="prospect-list">
            <div>

                <v-data-table
                    :headers="datatable_headers"
                    :items="datatable_items"
                    item-key="id_prospect"
                    loading-text="Loading... Please wait"
                    multi-sort
                    :search="search"
                    :footer-props="{
                      showFirstLastPage: true,
                      firstIcon: 'fas fa-fast-backward',
                      lastIcon: 'fas fa-fast-forward',
                      prevIcon: 'fas fa-step-backward',
                      nextIcon: 'fas fa-step-forward'
                    }"
              >
              <template v-slot:top>
                  <v-toolbar
                    flat
                  >
                    <v-toolbar-title class="contact-title">tous les contacts</v-toolbar-title>
                    <v-text-field
                        v-model="search"
                        class="quick-search"
                        :append-icon="'fa-search'"
                        label="Quick search"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialog"
                      max-width="500px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          Nouveau contact
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          Ajouter un nouveau contact
                        </v-card-title>
            
                        <v-card-text>
                          <v-container>
                            <v-text-field
                              label="Prénom"
                              v-model="dialogInfo.firstName"
                              placeholder="John"
                              autofocus
                            ></v-text-field>
                            <p v-if="errorLabels.firstName.length > 0" class="errorLabel">
                              {{ errorLabels.firstName }}
                            </p>
                            <v-text-field
                              label="Nom"
                              v-model="dialogInfo.lastName"
                              placeholder="Doe"
                            ></v-text-field>
                            <p v-if="errorLabels.lastName.length > 0" class="errorLabel">
                              {{ errorLabels.lastName }}
                            </p>
                            <v-text-field
                              label="Société"
                              v-model="dialogInfo.companyName"
                            ></v-text-field>
                            <v-text-field
                              label="N° de téléphone"
                              v-model="dialogInfo.phone"
                            ></v-text-field>
                            <v-text-field
                              label="Adresse mail"
                              v-model="dialogInfo.mail"
                            ></v-text-field>
                            <p v-if="errorLabels.mail.length > 0" class="errorLabel">
                              {{ errorLabels.mail }}
                            </p>

                          </v-container>
                        </v-card-text>
            
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="cancel()"
                          >
                            Annuler
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="save()"
                          >
                            Enregistrer
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:link="{ item }">
                    <v-icon small @click="stockDetails(item.id_stock, true)">fa-info-circle</v-icon>
                    <v-icon
                      small
                      v-if="
                        canManage() &&
                        item.status !=
                          stockStatus.filter(ss => {
                            return ss.value === 2
                          })[0].label
                      "
                      @click="showConfirmDelete(item.id_stock, true)"
                      title="Close the stock"
                      >fa-trash</v-icon
                    >
                  </template>
                  <template v-slot:[`item.id_step`]="{ item }">
                    <v-chip
                      :color="getColor(item.id_step)"
                      :text-color="getTextColor(item.id_step)"
                      dark
                    >
                      {{ getLabel(item.id_step) }}
                    </v-chip>
                  </template>
              </v-data-table>
            </div>
        </div>
    </div>
</template>
<script>
import { httpRequest } from "@/js/CommunicationHelper"
import { steps } from "@/js/resources.ts"

export default {
  name: "ContactList",
  data() {
    return {
      search: "",
      dialog: false,
      errorLabels: {
        lastName: "",
        firstName: "",
        mail: "",
        messages: {
          empty: "Champ obligatoire"
        }
      },
      dialogInfo: {
        lastName: "",
        firstName: "",
        companyName: "",
        phone: "",
        idStep: steps.find(step => step.code == "PROSPECT").id,
        mail: "",
        idUser: ""
      },
      datatable_headers: [
        {
          text: "Name",
          value: "name",
          align: "center",
          class: "dt-header"
        },
        {
          text: "Company name",
          value: "company_name",
          align: "center",
          class: "dt-header"
        },
        {
          text: "Step",
          value: "id_step",
          align: "center",
          class: "dt-header"
        },
        {
          text: "Tag",
          value: "id_tag",
          align: "center",
          class: "dt-header"
        },
        {
          text: "Actions",
          value: "link",
          align: "center",
          sortable: false
        }
      ],
      datatable_items: []
    }
  },
  created() {
    this.list();
  },
  methods: {
    list() {
      let instance = this;
      httpRequest('/v1/prospects', 'get', null)
        .then(function (response) {
          instance.datatable_items = Object.assign([], []);
          response.data.forEach(function (contact) {
            instance.datatable_items.push({
              name: contact.firstName + " " + contact.lastName,
              company_name: contact.companyName,
              id_step: contact.idStep,
              id_tag: contact.idTag,
              id_prospect: contact.idProspect
            })
          });
        })
        .catch(error => console.log(error));
    },
    cancel() {
      this.dialogInfo = Object.assign(
        {},
        {
          firstName: "",
          lastName: "",
          companyName: "",
          phone: "",
          mail: "",
          id_step: steps.find(step => step.code == "PROSPECT").id
        }
      )
      this.dialog = false;
    },
    save() {
      if (this.validateInputs()) {
        let instance = this;
        instance.dialogInfo.idUser = sessionStorage.getItem("idUser");
        httpRequest('/v1/prospect', 'post', instance.dialogInfo)
          .then(function () {
            instance.cancel();
            instance.list();
          })
          .catch(error => console.log(error));
      }
    },
    validateInputs () {
      if (this.dialogInfo.firstName.length == 0) {
        this.errorLabels.firstName = this.errorLabels.messages.empty;
        return false;
      }
      if (this.dialogInfo.lastName.length == 0) {
        this.errorLabels.lastName = this.errorLabels.messages.empty;
        return false;
      }
      if (this.dialogInfo.mail.length == 0) {
        this.errorLabels.mail = this.errorLabels.messages.empty;
        return false;
      }
      return true;
    },
    getColor(id_step) {
      return steps.find(step => step.id == id_step).color;
    },
    getTextColor(id_step) {
      return steps.find(step => step.id == id_step).text_color;
    },
    getLabel(id_step) {
      return steps.find(step => step.id == id_step).name;
    }
  }
}
</script>

<style scoped>

.v-chip {
  width: 130px;
  display: flex;
  justify-content: center;
  margin: auto;
}

.v-card {
    box-shadow: none !important;
}

.contact-title {
  /* font-weight: bold; */
  /* float: left; */
  margin-right: 20px;
  /* width: 20%; */
  font-size: 1.5em;
}

.prospect-list {
  padding-left: 15px;
  padding-right: 15px;
  background-color: white;
  border-radius: 15px;
}

.contact-list-container {
  width: 100%;
  height: 100%;
  background-color: #F1F3F6;
  padding: 20px;
}
</style>
