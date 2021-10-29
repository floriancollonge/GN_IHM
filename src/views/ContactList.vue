<template>
    <div class="content-centered contact-list-container">
        <div class="indicators">

        </div>
        <div class="prospect-list">
            <div>

                <v-data-table
                    :headers="datatable_headers"
                    :items="datatable_items"
                    item-key="name"
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
                    <v-toolbar-title class="contact-title">All contacts</v-toolbar-title>
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
                          New contact
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                        </v-card-title>
            
                        <v-card-text>
                          <v-container>
                          </v-container>
                        </v-card-text>
            
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                          >
                            Save
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
              </v-data-table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
  name: "ContactList",
  data() {
    return {
      search: "",
      dialog: false,
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
      datatable_items: [{
        name: "Adrien",
        company_name: "Test"
      },{
        name: "Adrien2",
        company_name: "Test"
      },{
        name: "Adrien3",
        company_name: "Test2"
      },{
        name: "Adrien4",
        company_name: "Test2"
      },{
        name: "Adrien5",
        company_name: "Test3"
      },{
        name: "Adrien6",
        company_name: "Test3"
      },{
        name: "Adrien7",
        company_name: "Test4"
      },{
        name: "Adrien8",
        company_name: "Test4"
      },{
        name: "Adrien9",
        company_name: "Test5"
      },{
        name: "Adrien10",
        company_name: "Test5"
      },{
        name: "Adrien11",
        company_name: "Test6"
      },{
        name: "Adrien12",
        company_name: "Test6"
      },{
        name: "Adrien13",
        company_name: "Test7"
      },{
        name: "Adrien14",
        company_name: "Test7"
      },{
        name: "Adrien15",
        company_name: "Test7"
      },{
        name: "Adrien16",
        company_name: "Test8"
      },{
        name: "Adrien17",
        company_name: "Test8"
      },{
        name: "Adrien18",
        company_name: "Test5"
      },{
        name: "Adrien19",
        company_name: "Test4"
      },{
        name: "Adrien 20",
        company_name: "Test2"
      },{
        name: "Adrien 21",
        company_name: "Test"
      }
      ]
    }
  },
  created() {
    var instance = this;
    axios
      .get('http://localhost:5003/v1/prospects')
      .then(function (response) {
        instance.contacts = Object.assign([], response.data);
      })
      .catch(error => console.log(error));
  },
  methods: {

  }
}
</script>

<style scoped>

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
