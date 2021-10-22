<template>
    <div class="datatable">
        <table class="table table-hover table-bordered" id="example">
            <thead>
                <tr>
                    <th class="header-name">Name</th>
                    <th class="header-company">Company</th>
                    <th class="header-step">Step</th>
                    <th class="header-tag">Tag</th>
                    <th class="header-action">Action</th>
                </tr>
            </thead>
            <tbody v-if="datas && datas.length > 0">
                <tr v-for="data in datas" :key="data.id">
                    <td>{{data.lastName + " " + data.firstName}}</td>
                    <td>{{data.companyName}}</td>
                    <td>{{data.idStep}}</td>
                    <td>{{data.idTag}}</td>
                </tr>
       
            </tbody>
        </table>
        <div v-if="datas && datas.length == 0" class="no-contact">
            No contacts found
        </div>
    </div>
</template>
<script>
export default {
    name: "ContactDatatable",
    data() {
        return {
            datas: [{
                id: "1",
                firstName: "Soham",
                lastName: "Watson",
                companyName: "Carrefour"
            },
            {
                id: "2",
                firstName: "Bernard",
                lastName: "Pena",
                companyName: "Alteca"
            }]
        }
    },
    methods: {
        
    },
    created() {
    },
    components: {
    }
}
</script>

<style >
table {
    width: 100%;
}

.header-name, .header-company {
    width: 27.5%;
}

.header-step, .header-tag, .header-action {
    width: 15%;
}

tr, thead {
    border-bottom: solid 1px #E1E1E1;
}

td {
    text-align: center;
}

.no-contact {
    width: 100%;
    text-align: center;
    font-style: italic;
}
</style>
