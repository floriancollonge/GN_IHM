<template>
    <div class="content-centered contact-list-container">
        <div class="indicators">

        </div>
        <div class="prospect-list">
            <div>
                <v-card>
                    <v-card-title>
                      All contacts
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="search"
                        :append-icon="'fa-search'"
                        label="Quick search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>

                <v-data-table
                    :headers="datatable_headers"
                    :items="datatable_items"
                    item-key="name"
                    loading-text="Loading... Please wait"
                    hide-default-footer
                    disable-sort
              >
          <!-- <template v-slot:item.winery="{ item }">
            <div class="inner-div" v-on:click="cellarWineDetails(item.cellar_wine)">
              {{ item.winery }}
            </div>
          </template>
          <template v-slot:item.region="{ item }">
            <div class="inner-div" v-on:click="cellarWineDetails(item.cellar_wine)">
              {{ item.region }}
            </div>
          </template>
          <template v-slot:item.appellation="{ item }">
            <div class="inner-div" v-on:click="cellarWineDetails(item.cellar_wine)">
              {{ item.appellation }}
            </div>
          </template>
          <template v-slot:item.vintage="{ item }">
            <div class="inner-div" v-on:click="cellarWineDetails(item.cellar_wine)">
              {{ item.vintage }}
            </div>
          </template>
          <template v-slot:item.type="{ item }">
            <div class="inner-div" v-on:click="cellarWineDetails(item.cellar_wine)">
              {{ item.type }}
            </div>
          </template>
          <template v-slot:item.cellar_potential="{ item }">
            <div v-if="item.cellar_potential == 1">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    class="icon-waiting"
                    v-bind="attrs"
                    v-on="on"
                    src="@/assets/images/icons/wine.svg"
                  />
                </template>
                <span>This wine has yet to attain it's full potential.</span>
              </v-tooltip>
            </div>
            <div v-else-if="item.cellar_potential == 2">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    class="icon-increase"
                    v-bind="attrs"
                    v-on="on"
                    src="@/assets/images/icons/wine.svg"
                  />
                </template>
                <span>This wine quality is good, but still increasing.</span>
              </v-tooltip>
            </div>
            <div v-else-if="item.cellar_potential == 3">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    class="icon-apogee"
                    v-bind="attrs"
                    v-on="on"
                    src="@/assets/images/icons/wine.svg"
                  />
                </template>
                <span>This wine is at its peak.</span>
              </v-tooltip>
            </div>
            <div v-else-if="item.cellar_potential == 4">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon large class="icon-decrease" color="black" v-bind="attrs" v-on="on"
                    >fa-exclamation-triangle</v-icon
                  >
                </template>
                <span>This wine quality has passed it's peak, and is decreasing.</span>
              </v-tooltip>
            </div>
            <div v-else>-</div>
          </template>
          <template v-slot:item.qty="{ item }">
            <div class="qty-field">
              <v-text-field
                v-model="item.qty"
                placeholder="120"
                @change="qtyChanged(item.id_cellar_wine, item.qty)"
              ></v-text-field>
            </div>
            <div v-if="item.qty < 24" class="low-stock">Low stock</div>
          </template>
          <template v-slot:item.favorite="{ item }">
            <div class="wine-favorite" @click="toggleFavorite(item.id_wine, item.favorite)">
              <i
                v-if="item.favorite"
                class="favorite fas fa-heart"
                title="Remove from your favorites"
              ></i>
              <i v-else class="far fa-heart" title="Add to your favorites"></i>
            </div>
          </template>
          <template v-slot:item.id_wine="{ item }">
            <div class="rating-div">
              <rating :idWine="item.id_wine"></rating>
            </div>
          </template> -->
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
                        </v-card>
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
      label: "",
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
  float: left;
  margin-right: 20px;
  width: 20%;
  font-size: 1.5em;
}

.prospect-list {
  padding-left: 15px;
  padding-right: 15px;
  background-color: white;
  border-radius: 15px;
}

.quick-search {
  width: 30%;
}

.cta-line {
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-content: center;
}

.cta-line label, .cta-line div {
  padding-top: 10px;
}

.contact-list-container {
  width: 100%;
  height: 100%;
  background-color: #F1F3F6;
  padding: 20px;
}
</style>
