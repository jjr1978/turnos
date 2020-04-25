const app = new Vue({
  el: "#app",
  data: {
    seleccion: {
      sucursal: "",
      tramite: "",
      horario: "",
      dia: ""
    },
    steps: {
      active: 0,
      primero: 0,
      ultimo: 3,
      pasos: [
        {
          id: 0,
          title: "Seleccione Sucursal",
        },
        {
          id: 1,
          title: "Seleccione Trámite",
        },
        {
          id: 2,
          title: "Seleccione Horario",
        },
        {
          id: 3,
          title: "Datos Personales",
        },
      ],
    },
    sucursales: [
      {
        display: "Ushuaia",
        value: "USH",
        habilitado: true,
        tramites: ["REN", "CAT", "VAR"],
      },
      {
        display: "Río Grande",
        value: "RG",
        habilitado: false,
        tramites: ["REN", "CAT", "VAR"],
      },
      {
        display: "Buenos Aires",
        value: "BA",
        habilitado: true,
        tramites: ["REN", "VAR"],
      },
    ],

    tramites: [
      { display: "Rentas", value: "REN", habilitado: false },
      { display: "Catastro", value: "CAT", habilitado: true },
      { display: "Varios", value: "VAR", habilitado: true },
    ],

    horarios: {
      sucursal: "USH",
      tramite: "REN",
      horarios: [
        {
          diaDisplay: "Jueves 29",
          diaValue: '2020-04-29',
          horariosdisponibles: [
            {
              display: "08:00",
              value: "0800",
            },
            {
              display: "08:30",
              value: "0830",
            },
            {
              display: "08:45",
              value: "0845",
            },
            {
              display: "09:00",
              value: "0900",
            },
            {
              display: "09:30",
              value: "0930",
            },
            {
              display: "10:00",
              value: "1030",
            },
            {
              display: "12:00",
              value: "1200",
            },
          ],
        },
        {
          diaDisplay: "Viernes 30",
          diaValue: '2020-04-30',

          horariosdisponibles: [
            {
              display: "11:00",
              value: "1100",
            },
            {
              display: "11:30",
              value: "1130",
            },
            {
              display: "11:45",
              value: "1145",
            },
            {
              display: "12:00",
              value: "1200",
            },
            {
              display: "12:30",
              value: "1230",
            },
            {
              display: "13:00",
              value: "1300",
            },
          ],
        },
      ],
    },
  },
  methods: {
    seleccionSucursal(sucursal) {
      this.seleccion.sucursal = sucursal;
    },
    seleccionTramite(tramite) {
      this.seleccion.tramite = tramite;
    },
    seleccionHorario(horario) {
      this.seleccion.horario = horario;
    },
    selecciondia(dia) {
      this.seleccion.dia = dia;
    },
    siguientePaso() {
      this.steps.active++;
    },
    anteriorPaso() {
      this.steps.active--;
    },
    sucursalActiva(sucursal) {
      return {
        active: this.seleccion.sucursal === sucursal,
      };
    },
    tramiteActiva(tramite) {
      return {
        active: this.seleccion.tramite === tramite,
      };
    },
    horarioActiva(horario) {
      return {
        active: this.seleccion.horario === horario,
      };
    },
    sucursalHabilitada(sucursal) {
      return this.sucursales.find((suc) => {
        return suc.value === sucursal;
      }).habilitado;
    },
    tramiteDisponible(tramite) {
      return this.sucursales
        .find((suc) => {
          return suc.value === this.seleccion.sucursal;
        })
        .tramites.includes(tramite);
    },
    tramiteHabilitada(tramite) {
      return this.tramites.find((tram) => {
        return tram.value === tramite;
      }).habilitado;
    },
  },
  computed: {
    controlSiguiente() {
      if (this.steps.active === 0) {
        return this.seleccion.sucursal;
      } else if (this.steps.active === 1) {
        return this.seleccion.tramite;
      } else if (this.steps.active === 2) {
        return this.seleccion.horario;
      } else if (this.steps.active === 3) {
        return false;
      }
    },
    controlAnterior() {
      if (this.steps.active === this.steps.primero) {
        return false;
      }
      return true;
    },
    controlFinalizar() {
      return this.steps.active === this.steps.ultimo;
    },
    filterdDia(){
      return [{
        display:this.horarios.horarios[0].diaDisplay,
        value:this.horarios.horarios[0].diaValue,
      },
      {
        display:this.horarios.horarios[1].diaDisplay,
        value:this.horarios.horarios[1].diaValue,
      },
    ];
    },
    filterdHorarios(){
      return this.horarios.horarios[0].horariosdisponibles;
    }
  },
});
