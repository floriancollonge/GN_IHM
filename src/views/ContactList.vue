<template>
    <div class="content-centered contact-list-container" style="position:relative">
        <div id="list-panel" class="list-panel">
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
                      @click:row="detailsContact"
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
        <div :class="[showDetail ? 'slidein open' : 'slidein']" ref="slidein">
          <h1>{{selectedContact.firstName}} {{selectedContact.lastName}} <v-chip v-if="selectedContact && selectedContact.id_step"
                        :color="getColor(selectedContact.id_step)"
                        :text-color="getTextColor(selectedContact.id_step)"
                        dark
                      >
                        {{ getLabel(selectedContact.id_step) }}
                      </v-chip></h1>
          <div><v-text-field
            label="Société"
            v-model="selectedContact.companyName"
          ></v-text-field>
          <v-text-field
            label="Numéro de téléphone"
            v-model="selectedContact.phone"
          ></v-text-field>
          <v-text-field
            label="Adresse mail"
            v-model="selectedContact.mail"
          ></v-text-field>
          <!-- <v-text-field
            label="Last contact date"
            prepend-icon="far fa-calendar-alt"
            v-model="selectedContact.lastContactDate"
          ></v-text-field>
          <v-text-field
            label="Next contact date"
            prepend-icon="far fa-calendar-alt"
            v-model="selectedContact.nextContactDate"
          ></v-text-field> -->
          <date-picker v-model=selectedContact.lastContactDate></date-picker>
          <date-picker v-model=selectedContact.nextContactDate></date-picker>
          </div>
          <div class="actions">
            <v-btn @click="updateContact"></v-btn>
          </div>
          <button class="close-btn" v-on:click="toggleDetails"> X </button>
        </div>
    </div>
</template>
<script>
import { httpRequest } from "@/js/CommunicationHelper"
import { steps } from "@/js/resources.ts"
import DatePicker from "@/components/DatePicker"

export default {
  name: "ContactList",
  data() {
    return {
      search: "",
      lastDateMenu: false,
      nextDateMenu: false,
      showDetail: false,
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
      selectedContact: {
        idProspect: "",
        lastName: "",
        firstName: "",
        companyName: "",
        phone: "",
        id_step: "",
        id_tag: "",
        mail: "",
        idUser: "",
        lastContactDate: null,
        nextContactDate: null
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
  components: {
    'date-picker': DatePicker
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
              id_contact: contact.idProspect,
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
        let self = this;
        self.dialogInfo.idUser = sessionStorage.getItem("idUser");
        httpRequest('/v1/prospect', 'post', self.dialogInfo)
          .then(function () {
            self.cancel();
            self.list();
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
    },
    toggleDetails() {
      this.showDetail = !this.showDetail;
    },
    setSlideInValue(valueSlideIn) {
      this.showDetail = valueSlideIn;
    },
    detailsContact(item) {
      if (item.id_contact === this.selectedContact.idContact) {
        this.setSlideInValue(false);
      } else {
        let self = this;
        httpRequest('/v1/prospect/' + item.id_contact, 'get', null)
          .then(function (response) {
            self.selectedContact = Object.assign({}, response.data);
            self.setSlideInValue(true);
          })
          .catch(error => console.log(error));
      }
    },
    updateContact() {
      let self = this;
      httpRequest('/v1/prospect/' + self.selectedContact.idProspect, 'put', self.selectedContact)
          .then(function (response) {
            self.selectedContact = Object.assign({}, response.data);
            self.setSlideInValue(true);
          })
          .catch(error => console.log(error));
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
  margin-right: 20px;
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

.slidein {
  max-width: 50%;
  min-width: 30%;
  padding: 2em 3em; 
  position: fixed; 
  z-index: 100;
  top: 0;
  right: -100%;
  background: #ddd;
  height: 100%;
  box-shadow: 1px 1px 10px rgba(0,0,0,.5);
  transition: all .5s ease-in-out; 
}

/* Set positioning back to 0 when toggled opened */
.open {
  right: 0; 
}

/* add a close button in case toggle button is hidden on smaller screens */
.close-btn {
  border: none; 
  font-weight: bold; 
  font-size: 2em; 
  background: transparent; 
  position: absolute; 
  top: 0;
  left: 0;
  padding: .5em;
}

button {
  padding: .5em 1em;
  border-radius: 3em;
  font-size: 1.1em;
}

</style>
