export const mockElaboration = {
  1: {
    ingredients: [
      { name: "Avena", amount: "100g", category: "cereales" },
      { name: "Plátano maduro", amount: "1 unidad", category: "frutas" },
      { name: "Huevo", amount: "1 unidad", category: "proteínas" },
      { name: "Leche de almendras", amount: "120ml", category: "líquidos" },
      { name: "Canela en polvo", amount: "1 cucharadita", category: "especias" },
      { name: "Sal", amount: "1 pizca", category: "especias" },
      { name: "Aceite de coco", amount: "1 cucharada", category: "grasas" }
    ],
    steps: [
      {
        step: 1,
        description: "En un bol, machaca el plátano maduro hasta que quede una pasta suave",
        time: "2 min",
        tips: "Usa un plátano bien maduro para más dulzor natural"
      },
      {
        step: 2,
        description: "Añade el huevo y bate bien hasta que se integre completamente",
        time: "1 min",
        tips: "Bate en movimientos circulares para incorporar aire"
      },
      {
        step: 3,
        description: "Agrega la leche de almendras y mezcla suavemente",
        time: "1 min",
        tips: "Puedes usar cualquier leche vegetal de tu preferencia"
      },
      {
        step: 4,
        description: "Incorpora la avena, canela y sal. Mezcla hasta obtener una masa homogénea",
        time: "2 min",
        tips: "Deja reposar 5 minutos para que la avena absorba el líquido"
      },
      {
        step: 5,
        description: "Calienta una sartén antiadherente a fuego medio-bajo",
        time: "3 min",
        tips: "No uses fuego alto para evitar que se quemen"
      },
      {
        step: 6,
        description: "Añade un poco de aceite de coco y vierte 2-3 cucharadas de masa por tortita",
        time: "2 min",
        tips: "No llenes demasiado la sartén, deja espacio entre tortitas"
      },
      {
        step: 7,
        description: "Cocina hasta que aparezcan burbujas en la superficie, luego voltea",
        time: "3 min",
        tips: "Espera a que las burbujas se formen antes de voltear"
      },
      {
        step: 8,
        description: "Cocina el otro lado hasta que esté dorado y retira del fuego",
        time: "2 min",
        tips: "No presiones las tortitas mientras se cocinan"
      }
    ],
    tips: [
      "Puedes añadir frutos secos picados a la masa",
      "Sirve con miel, sirope de agave o frutas frescas",
      "Guarda las sobras en la nevera hasta 3 días",
      "Para congelar, separa con papel de horno"
    ],
    nutritionInfo: {
      calories: 320,
      protein: "12g",
      carbs: "45g",
      fat: "8g",
      fiber: "6g",
      sugar: "8g"
    }
  },
  2: {
    ingredients: [
      { name: "Tortita integral", amount: "1 unidad", category: "base" },
      { name: "Salsa de tomate casera", amount: "3 cucharadas", category: "salsas" },
      { name: "Mozzarella fresca", amount: "80g", category: "lácteos" },
      { name: "Tomate cherry", amount: "8 unidades", category: "verduras" },
      { name: "Albahaca fresca", amount: "6 hojas", category: "hierbas" },
      { name: "Aceite de oliva", amount: "1 cucharada", category: "grasas" },
      { name: "Orégano seco", amount: "1 cucharadita", category: "especias" },
      { name: "Sal y pimienta", amount: "al gusto", category: "especias" }
    ],
    steps: [
      {
        step: 1,
        description: "Precalienta el horno a 200°C (400°F)",
        time: "10 min",
        tips: "Asegúrate de que el horno esté bien caliente"
      },
      {
        step: 2,
        description: "Coloca la tortita en una bandeja de horno forrada con papel",
        time: "1 min",
        tips: "Usa papel de horno para evitar que se pegue"
      },
      {
        step: 3,
        description: "Extiende la salsa de tomate sobre la tortita",
        time: "2 min",
        tips: "Deja un borde de 1cm sin salsa"
      },
      {
        step: 4,
        description: "Distribuye la mozzarella en rodajas sobre la salsa",
        time: "2 min",
        tips: "No amontones el queso, distribúyelo uniformemente"
      },
      {
        step: 5,
        description: "Corta los tomates cherry por la mitad y colócalos",
        time: "3 min",
        tips: "Distribuye los tomates de forma decorativa"
      },
      {
        step: 6,
        description: "Espolvorea orégano, sal y pimienta",
        time: "1 min",
        tips: "No añadas demasiada sal, la mozzarella ya es salada"
      },
      {
        step: 7,
        description: "Hornea durante 12-15 minutos hasta que el queso se derrita",
        time: "15 min",
        tips: "Vigila los últimos minutos para que no se queme"
      },
      {
        step: 8,
        description: "Retira del horno y decora con hojas de albahaca fresca",
        time: "2 min",
        tips: "Añade la albahaca al final para mantener su sabor"
      }
    ],
    tips: [
      "Puedes añadir aceitunas negras o verdes",
      "Para más proteínas, añade jamón de pavo",
      "Sirve inmediatamente para disfrutar del queso fundido",
      "Puedes hacer la salsa de tomate casera con antelación"
    ],
    nutritionInfo: {
      calories: 450,
      protein: "18g",
      carbs: "35g",
      fat: "22g",
      fiber: "8g",
      sugar: "6g"
    }
  },
  3: {
    ingredients: [
      { name: "Tortita de proteínas", amount: "1 unidad", category: "base" },
      { name: "Pechuga de pollo", amount: "150g", category: "proteínas" },
      { name: "Lechuga", amount: "2 hojas", category: "verduras" },
      { name: "Tomate", amount: "1/2 unidad", category: "verduras" },
      { name: "Cebolla morada", amount: "1/4 unidad", category: "verduras" },
      { name: "Yogur griego natural", amount: "2 cucharadas", category: "lácteos" },
      { name: "Zumo de limón", amount: "1 cucharada", category: "condimentos" },
      { name: "Aceite de oliva", amount: "1 cucharada", category: "grasas" },
      { name: "Especias para pollo", amount: "1 cucharadita", category: "especias" }
    ],
    steps: [
      {
        step: 1,
        description: "Sazona el pollo con las especias y déjalo reposar 10 minutos",
        time: "10 min",
        tips: "Puedes usar curry, paprika o hierbas provenzales"
      },
      {
        step: 2,
        description: "Calienta una sartén con aceite de oliva a fuego medio",
        time: "2 min",
        tips: "No uses fuego alto para que el pollo se cocine uniformemente"
      },
      {
        step: 3,
        description: "Cocina el pollo 6-8 minutos por cada lado hasta que esté dorado",
        time: "16 min",
        tips: "Verifica que esté bien cocinado cortando la parte más gruesa"
      },
      {
        step: 4,
        description: "Retira el pollo y déjalo reposar 5 minutos antes de cortar",
        time: "5 min",
        tips: "El reposo permite que los jugos se redistribuyan"
      },
      {
        step: 5,
        description: "Corta el pollo en tiras finas",
        time: "3 min",
        tips: "Corta en contra de la fibra para mayor ternura"
      },
      {
        step: 6,
        description: "Prepara la salsa mezclando yogur, limón y sal",
        time: "2 min",
        tips: "Puedes añadir hierbas frescas como cilantro o menta"
      },
      {
        step: 7,
        description: "Coloca la tortita y añade lechuga, tomate y cebolla",
        time: "3 min",
        tips: "Escurre bien las verduras para evitar que se moje la tortita"
      },
      {
        step: 8,
        description: "Añade el pollo y la salsa, enrolla y sirve",
        time: "2 min",
        tips: "Enrolla firmemente pero sin apretar demasiado"
      }
    ],
    tips: [
      "Puedes preparar el pollo con antelación",
      "Añade aguacate para más cremosidad",
      "Sirve con una guarnición de verduras",
      "Puedes usar tortilla de trigo integral como alternativa"
    ],
    nutritionInfo: {
      calories: 380,
      protein: "35g",
      carbs: "25g",
      fat: "12g",
      fiber: "6g",
      sugar: "4g"
    }
  }
}; 