<script setup>
import ComRef from "./ComRef.vue";
import { ref,reactive, computed, onMounted } from "vue/dist/vue.esm-bundler";
import Counter from "./Counter";
import Load from "./Load.vue";

const attributeName= ref("class");


// books list
const books = reactive([
  {
    name : "Algorithm Design",
    author : "Orindo Paul",
    price : 850
  },
  {
    name : "Programing in Java",
    author : "Anm Buzlur Rahoman",
    price : 375
  },
  {
    name : "Computer Programming 1",
    author : "Tamim Shariar Subin",
    price : 260
  }
]);

// create computed function using computed api
const totalBooks = computed(()=>{
  return books.length;
});


// create computed function without using computed api
const totalPrice = ()=>{
  return books.reduce((totalPrice,{price})=> totalPrice+price,0);
}

// create writable computed using set and get
const firstName = ref("Arabi");
const lastName = ref("Arrowbeen");
const fullName = computed({
  // getter
  get(){
    return firstName.value + ' ' + lastName.value;
  },
  //setter
  set(newValue){
    [
      firstName.value,
      lastName.value
    ] = newValue.split(' ');
  }
})

// button event listener to change name
function changeName(){
  fullName.value = "Ans Anonymo";
}

const isActive = ref(true);
const isUnActive = ref(false);

const statusClassObject = computed(()=>({
  active : isActive.value,
  unactive : isUnActive.value
}))

function toggleStatus(){
  isActive.value = !isActive.value;
  isUnActive.value = !isUnActive.value;
}

// conditional rendering
const showMessage = ref(false);

function showMessageBtn(event){
  showMessage.value= !showMessage.value;
}

// form binding
const selectedBooks = ref([]);

// refs
const boxes = ref([]);

// const component
const component = ref(null);

onMounted(()=>{
  boxes.value.forEach(box =>{
    box.style.backgroundColor = "purple";
  })
  console.log(component)
})

const loadWidth = ref(120);
</script>


<template>
  <h1>Hello, World!</h1>

  <!-- apply dynamic attribute name -->
  <h1 
    :[attributeName]="'honestyle'"
    >Hello, Universe</h1>
  <!-- here some useless comp -->
  <UselessBtn />

  <ComRef />
  
  <h6>&lt;!-- Use of computed function. --&gt;</h6>
  <h2>My Book Shelf</h2>

  <!-- use computed function used are useing computed api -->
  <h3>Total books : {{ totalBooks }} </h3>

  <!-- use computed function without computed api -->
  <h3>Total Price : {{ totalPrice()}}</h3>

  <!-- using writeable computed -->
  <h3>First name is {{ firstName }}</h3>
  <h3>Last name is {{ lastName }}</h3>
  <h3>Full name is {{ fullName }}</h3>
  <button class="btn"
          @click="changeName">Change Name</button>

  <h6>&lt;!-- Use of computed function. --&gt;</h6>

  <!-- redner class besed on state using object toggle -->
  <button 
   class="status-btn"
   :class="statusClassObject"
   @click="toggleStatus">
    Status : {{ isActive ? "Active" : "Unactive" }}
  </button>

  <h6>&lt;!-- Conditional Rendering. --&gt;</h6>

  <button 
    class="btn"
    @click="showMessageBtn"
    >Show me the message</button>
  <p v-show="showMessage" class="message">There is no message</p>


  <h6>&lt;!-- List rendering --&gt;</h6>
  <h3>All books name : </h3>
  <ul>
    <li v-for="(book, index) in books" :key="book.name">
    Book no {{ index }} : {{ book.name }}
    </li>
  </ul>

  <h3>Properties of algorithm design : </h3>
  <ul>
    <li v-for="value in books[0]" key="value">
      {{ value }}
    </li>
  </ul>

  <h3>Below render 1 to 10 box</h3>
  <ul>
    <li v-for="n in 10" class="box" ref="boxes"></li>
  </ul>


  <h6>&lt;!-- Form binding --&gt;</h6>
  <h3>Your selected books : {{ selectedBooks }} </h3>

  <h5>Please select box from below : </h5>
  <div
      v-for="{name} in books" 
      class="ckbx"
      :key="name">
        <input 
               type="checkbox"
               :name="name"
               :value="name"
               :id="name"
               v-model="selectedBooks"> 
        <label :for="name">{{ name }}</label>
  </div>


  <h6>&lt;!-- Ref Template --&gt;</h6>
  <ComRef ref="component" />

  <Counter />

  <h6>&lt;!-- Basic Component --&gt;</h6>
  
  <div class="load" :style="`width : ${loadWidth}px`">
    <Load
      @make-large="(number)=>{
        loadWidth+=number
      }"
    />
  </div>

  <component :is="ComRef" />
</template>

<style>

.load{
  display: inline-block;
  padding: 2px;
  background-color: rgb(0, 213, 255);
}

#app{
  position: relative;
}

.honestyle{
  margin: 2px;
  padding: 20px 4px;
  color: rgb(201, 44, 0);
  border: 1px solid rgb(201, 44, 0);
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}

h4,h3{
  font-family: 'Courier New', Courier, monospace;
  color: rgb(0, 80, 201);
}

h6{
  text-align: center;
  font-family: 'Victor Mono';
  color: brown;
  font-size: 18px;
}

.btn{
  font-size: 12px;
  padding: 12px;
  margin: 5px;
  background-color: rgb(0, 80, 201);
  border: 1px solid rgb(0, 80, 201);
  color: aliceblue;
  transition: all 0.3s;
  cursor: pointer;
}

.btn:hover{
  background-color: inherit;
  color: rgb(0, 80, 201);
}

.status-btn{
  margin: 5px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  color : aliceblue;
}

.active{
  background-color: rgb(0, 111, 68);
  border: 1px solid rgb(0, 111, 68);
}

.active:hover{
  background-color: aliceblue;
  color: rgb(0, 111, 68);
}

.unactive{
  background-color: rgb(21, 30, 38);
  border: 1px solid rgb(21, 30, 38);
}

.unactive:hover{
  background-color: aliceblue;
  color: rgb(21, 30, 38);
}

.message{
  position: fixed;
  right: 10px;
  bottom:10px;
  right: 0px;
  padding: 10px;
  background-color: rgb(0, 111, 68);
  text-align: center;
  color: aliceblue;
  font-family: 'Courier New', Courier, monospace;
  width: 200px;
}

ul{
  color: rgb(0, 65, 40);
  font-family: 'Courier New', Courier, monospace;
}

.box{
  list-style: none;
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: rgb(0, 111, 68);
  border-radius: 10px;
  margin: 10px;
}

h5{
  color: rgb(21, 30, 38);
  font-family: 'Courier New', Courier, monospace;
}

.ckbx input, .ckbx label,.ckbx{
    cursor: pointer;
}

.ckbx{
    font-family: 'Courier New', Courier, monospace;
}
</style>./Counter.js