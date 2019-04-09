<template>
  <div style="display: flex;flex-direction: column;justify-content: space-between; height: 100vh">
    <Header></Header>

    <!--Add my components-->

    <div>
      <div v-bind:style="{display: load_module_successfull_display}" style="text-align: center"><h1>Cannot load module. Please, try again later</h1></div>
      <form v-bind:style="{display: form_display}" style="user-select: none" id="new_set_form" onsubmit="return false">
        <div class="container">
          <h2 style="color: #12496d">{{title}}</h2>
          <div class="row" style="margin-bottom: 15px">
            <div class="col-sm-3">
              <input id="name" type="text" placeholder="Name" v-bind:value="name_value" required>
            </div>
            <div class="col-sm-3">
              <!--<input id="category" type="text" placeholder="Category...">-->
              <b-form-select v-model="selected_category" :options="categoryTitles" v-bind:disabled="noSubject"></b-form-select>
            </div>
            <div class="col-sm-3" id="language_check_div">
              <span>Language</span>
              <!--<input type="checkbox" id="language_check" value="language_check" v-on:click="language_check">-->
              <div id="language_checkbox" v-on:click="language_check">
                <div id="language_check_sign">&#10003;</div>
              </div>
            </div>
            <div class="col-sm-3">
              <button id="create_btn" v-on:click="btnClick">{{create_btn_title}}</button>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3">
              <!--<input id="subject" type="text" placeholder="Subject...">-->
              <b-form-select id='subj_select' v-bind:value="selected_subject" :options="subjectsTitles" v-on:change="selectSubject"></b-form-select>
            </div>
            <div class="col-sm-3 row" id="public_check_div">

              <div class="col-sm-6">
                <span>Public</span>
                <div id="public_checkbox" v-on:click="public_check">
                  <div id="public_check_sign" v-bind:style="{visibility: public_check_visibility}">&#10003;</div>
                </div>
              </div>

              <div id="price_div" v-bind:style="{display: price_div_display}" class="col-sm-6"
                   style="padding-right: 0; padding-left: 0; display: none;">
                <input :disabled="price_disabled" id="price" type="number" v-bind:value="price_value" placeholder="Price">
                <div style="display: inline; margin-left: 5px">
                  <img id="coin" src="../css/images/coin.png">
                </div>
              </div>

            </div>
            <div class="col-sm-5 row" style="padding-top: 4px; padding-bottom:4px;">
              <div class="col-sm-5" style="padding-right: 0">
                <select id="lang1" disabled>
                  <option value="sq">Albanian</option>
                  <option value="ar">Arabic</option>
                  <option value="hy">Armenian</option>
                  <option value="az">Azerbaijani</option>
                  <option value="eu">Basque</option>
                  <option value="be">Belarusian</option>
                  <option value="bn">Bengali</option>
                  <option value="zh">Chinese</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="en" selected>English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="tl">Filipino</option>
                  <option value="tl">Filipino</option>
                  <option value="gl">Galician</option>
                  <option value="de">German</option>
                  <option value="ka">Georgian</option>
                  <option value="el">Greek</option>
                  <option value="hu">Hungarian</option>
                  <option value="id">Indonesian</option>
                  <option value="it">Italian</option>
                  <option value="la">Latin</option>
                  <option value="no">Norwegian</option>
                  <option value="ru">Russian</option>
                  <option value="sl">Slovenian</option>
                  <option value="es">Spanish</option>
                  <option value="sw">Swahili</option>
                  <option value="sv">Swedish</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="uk">Ukrainian</option>
                  <option value="vi">Vietnamese</option>
                  <option value="cy">Welsh</option>
                </select>
              </div>
              <div class="col-sm-2" id="language_switch_div">
                <img v-on:click="switchLanguages" id="language_switch_img" src="../css/images/switch.svg">
              </div>
              <div class="col-sm-5" style="padding-left: 0">
                <select id="lang2" disabled>
                  <option value="sq">Albanian</option>
                  <option value="ar">Arabic</option>
                  <option value="hy">Armenian</option>
                  <option value="az">Azerbaijani</option>
                  <option value="eu">Basque</option>
                  <option value="be">Belarusian</option>
                  <option value="bn">Bengali</option>
                  <option value="zh">Chinese</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="tl">Filipino</option>
                  <option value="tl">Filipino</option>
                  <option value="gl">Galician</option>
                  <option value="de">German</option>
                  <option value="ka">Georgian</option>
                  <option value="el">Greek</option>
                  <option value="hu">Hungarian</option>
                  <option value="id">Indonesian</option>
                  <option value="it">Italian</option>
                  <option value="la">Latin</option>
                  <option value="no">Norwegian</option>
                  <option value="ru">Russian</option>
                  <option value="sl">Slovenian</option>
                  <option value="es">Spanish</option>
                  <option value="sw">Swahili</option>
                  <option value="sv">Swedish</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="uk" selected>Ukrainian</option>
                  <option value="vi">Vietnamese</option>
                  <option value="cy">Welsh</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div id="words">
            <!--filling by for each loop-->
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_1">1. </span><input :data-termid="terms[0][2]" v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_1"
                                                                                style="width: 70%" v-bind:value="terms[0][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6">
                <input type="text" class="translate_input" v-on:keyup="check_translation" id="translate_1" style="width: 70%"
                       placeholder="Enter translation or definition" v-bind:value="terms[0][1]">
                <span id="t_e_span_1" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                  <input type="text" id="translate_example_1" class="translate_example"
                         style="cursor: pointer;width: 70%;margin-top:5px;">
                </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_2">2. </span><input :data-termid="terms[1][2]" v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_2"
                                                                                style="width: 70%" v-bind:value="terms[1][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6">
                <input type="text" class="translate_input" v-on:keyup="check_translation" id="translate_2" style="width: 70%"
                       placeholder="Enter translation or definition" v-bind:value="terms[1][1]">
                <span id="t_e_span_2" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_2" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_3">3. </span><input :data-termid="terms[2][2]" v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_3"
                                                                                style="width: 70%" v-bind:value="terms[2][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" v-on:keyup="check_translation" id="translate_3" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[2][1]">
                <span id="t_e_span_3" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_3" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_4">4. </span><input :data-termid="terms[3][2]" v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_4"
                                                                                style="width: 70%" v-bind:value="terms[3][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" v-on:keyup="check_translation" id="translate_4" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[3][1]">
                <span id="t_e_span_4" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_4" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_5">5. </span><input :data-termid="terms[4][2]" v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_5"
                                                                                style="width: 70%" v-bind:value="terms[4][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" v-on:keyup="check_translation" id="translate_5" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[4][1]">
                <span id="t_e_span_5" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_5" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_6">6. </span><input :data-termid="terms[5][2]" v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_6"
                                                                                style="width: 70%" v-bind:value="terms[5][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" v-on:keyup="check_translation" id="translate_6" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[5][1]">
                <span id="t_e_span_6" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" v-on:click="setTranslation" id="translate_example_6" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <tweet-component v-for="tweet in tweets" :tweet="tweet"></tweet-component>
          </div>
          <div class="row">
            <div class="offset-4 col-sm-3">
              <button class="" id="addmore_btn" v-on:click="addNewWordComponent">Add more</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!--My last edits adding-->
    <div class="card-footer footer">
      MEMOSEEDS INC., ALL RIGHTS RESERVED
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';
  import Header from './Header'
  Vue.component('tweet-component',{
    template: '<div class="row newword_div">' +
      '<div class="col-sm-6">' +
      '<span :class="tweet.span_class">{{tweet.number}}. </span>' +
      '<input :data-termid="tweet.termId" v-on:keyup="asynctranslation" type="text" ' +
      'class="word_input" :id="tweet.input_id" style="width: 70%" placeholder="Enter a word or term" v-bind:value="tweet.word_val"></div>' +
      '<div class="col-sm-6">' +
      '<input type="text" class="translate_input" v-on:keyup="check_translation" :id="tweet.translate_input_id" style="width: 70%" ' +
      'placeholder="Enter translation or definition" v-bind:value="tweet.translate_val">' +
      '<span :id="tweet.translate_span_id" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">' +
      '<input type="text" v-on:click="setTranslation" :id="tweet.translate_example_id" class="translate_example" ' +
      'style="cursor: pointer;width: 70%;margin-top:5px;"></span>' +
      '</div>' +
      '</div>',
    props: {
      tweet: {
        type: Object
      },
      span_class: {
        type: String
      },
      input_id: {
        type: String
      },
      word_val: {
        type: String
      },
      translate_val: {
        type: String
      },
      translate_input_id: {
        type: String
      },
      translate_span_id: {
        type: String
      },
      translate_example_id: {
        type: String
      },
      number: {
        type: Number
      },
      termId: {
        type: String
      },
      name: {
        type: String
      }
    },
    data () {
      return {
        bar: 'Bar'
      }
    },methods: {
      check_translation: function(evt){
          var typed_div = evt.target.id;
          var type_div_num = typed_div.match(/\d/g).join('');

          // //text for translation
          var entering_line = document.getElementById("translate_" + type_div_num).value;
          var translation_example = document.getElementById("translate_example_" + type_div_num).value;
          if(entering_line != '' && !(translation_example.includes(entering_line))){
            document.getElementById("translate_example_" + type_div_num).style.display = 'none';
          }else{
            if(translation_example.length == entering_line.length){
              document.getElementById("translate_example_" + type_div_num).style.display = 'none';
            }else{
              document.getElementById("translate_example_" + type_div_num).style.display = 'block';
            }
          }
      },
      asynctranslation: function (evt) {

        var language_checkbox = document.getElementById("language_check_sign");
        var language_checkbox_visibility_status = window.getComputedStyle(language_checkbox).getPropertyValue('visibility');
        if (language_checkbox_visibility_status == "visible") {
          this.inputkeyUp(evt);
        }
      },
      inputkeyUp: function (evt) {
        // sending word for translation
        var typed_div = evt.target.id;
        var typed_div_number = typed_div.match(/\d/g).join('');
        //text for translation
        var souceText = document.getElementById("" + typed_div + "").value;
        //getting short value and full name of source language
        var sourceLanguageValue = document.getElementById('lang1').value;
        var sourceLanguage_fullName = document.getElementById('lang1').selectedOptions[0].text;
        //getting short value and full name of Target language
        var targetLanguageValue = document.getElementById('lang2').value;
        var targetLanguage_fullName = document.getElementById('lang2').selectedOptions[0].text;

        if (souceText != "") {

          //send on server
          let config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.$cookies.get('user_session')
            }
          };

          var data = {
            "SourceText": souceText,
            "SourceLanguage": sourceLanguage_fullName,
            "TargetLanguage": targetLanguage_fullName
          };

          axios.post('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/translate', data, config)
            .then(response => {
              var translation = response.data.transResponse;
              if (translation != "") {
                var element = document.getElementById("translate_example_" + typed_div_number + "");
                element.value = translation;
                element.style.display = "block";
              } else {
                //send via js
                console.log('sending for translation via js');
                var link = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLanguageValue +
                  '&tl=' + targetLanguageValue + '&dt=t&q=' + souceText;
                axios.post(link)
                  .then(response => {
                    var translation = response.data[0][0][0];

                    var element = document.getElementById("translate_example_" + typed_div_number + "");
                    element.value = translation;
                    element.style.display = "block";
                  })
                  .catch(error => {
                    console.log(error)
                  });

              }
            })
            .catch(error => {
              console.log(error)
            });

        } else {
          var element = document.getElementById("translate_example_" + typed_div_number + "");
          element.style.display = "none";
        }

      },
      setTranslation: function (evt) {
        var typed_div = evt.target.id;
        var typed_div_number = typed_div.match(/\d/g).join('');

        var translate_example_element = document.getElementById("translate_example_" + typed_div_number + "");
        var translation = translate_example_element.value;

        var translate_field = document.getElementById("translate_" + typed_div_number + "");
        translate_field.value = translation;

        translate_example_element.style.display = "none";
      },
    }
  });

  let tweets = [];

  export default {
    name: "EditModule",
    components: {Header},
    data() {
      return {
        tweets,
        load_module_successfull_display: 'none',
        form_display: 'block',
        title:'Edit Set',
        create_btn_title:'EDIT SET',
        moduleId: '',
        filterResponse: [],
        subjectsTitles: [],
        categoryTitles: [],
        selected_subject: 'default',
        selected_category: 'default',
        noSubject: true,
        is_Author: false,
        price_disabled: true,
        number: 7,
        edit_response: {},
        name_value: '',
        price_value: '',
        price_div_display: "none",
        public_check_visibility: 'hidden',
        public_check_disabled: true,
        terms:[['','',''],['','',''],['','',''],['','',''],['','',''],['','','']]
      }
    },
    created: function () {
      document.body.className = 'inside';
      var path = this.$route.path.split('/');
      if(isNaN(path[path.length - 1])){
        this.load_module_successfull_display = 'block';
        this.form_display = 'none';
        return;
      }else{
        this.moduleId = path[path.length - 1];
      }

      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('user_session')
        }
      };

      var userId = this.$cookies.get('userId');
      var moduleId = this.moduleId;
      axios.get('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/user/' + userId + '/modules/' + moduleId, config)
      // axios.get('https://memeseeds.herokuapp.com/user/' + userId + '/modules/' + moduleId, config)
        .then(response => {
          //select subject
          this.selected_subject = response.data.subject;
          //select category
          this.selected_category = response.data.category;
          this.edit_response = response.data.module;
      this.is_Author = (response.data.module.userId == userId)? true: false;

          //test data
          // this.is_Author = true;
          // this.selected_subject = 'default';
          // this.selected_category = 'default';
          // this.edit_response = {
          //   "moduleId": 51,
          //   "userId": 5,
          //   "price": 333,
          //   "isLocal": true,
          //   "name": "Room",
          //   "categoryId": 1,
          //   "inheritedFrom": 0,
          //   "terms": [
          //     {
          //       "termId": 101,
          //       "name": "table",
          //       "moduleId": 51,
          //       "definition": "стол"
          //     },{
          //       "termId": 102,
          //       "name": "ass",
          //       "moduleId": 51,
          //       "definition": "жопа"
          //     },
          //     {
          //       "termId": 103,
          //       "name": "noup",
          //       "moduleId": 51,
          //       "definition": "неа"
          //     },
          //     {
          //       "termId": 104,
          //       "name": "asd",
          //       "moduleId": 51,
          //       "definition": "asd"
          //     },
          //     {
          //       "termId": 105,
          //       "name": "dsa",
          //       "moduleId": 51,
          //       "definition": "dsa"
          //     },
          //     {
          //       "termId": 106,
          //       "name": "qwe",
          //       "moduleId": 51,
          //       "definition": "ewq"
          //     },
          //     {
          //       "termId": 107,
          //       "name": "wer",
          //       "moduleId": 51,
          //       "definition": "rew"
          //     },{
          //       "termId": 108,
          //       "name": "108",
          //       "moduleId": 51,
          //       "definition": "d108"
          //     }
          //   ]
          // };
          this.edit_created();

        })
        .catch(error => {
          this.load_module_successfull_display = 'block';
          this.form_display = 'none';
        });


    },
    methods: {
      edit_created: function () {
        // 2) set name
        this.name_value = this.edit_response.name;

        // 3) if is public(not islocal) then set public_check + price + subject + category
        if(this.edit_response.isLocal){
          // 4) else if not public (is local) then if subject/category are set => then set them
          //subject and category
          var s1 = (this.selected_subject == 'default')?
            {
            value: 'default',
            text: 'Subject'
          }: {
            value: this.selected_subject,
            text: this.selected_subject
          };

          this.subjectsTitles.push(s1);

          //select category
          var t1 = (this.selected_category == 'default')?
            {
              value: 'default',
              text: 'Category'
            }: {
              value: this.selected_category,
              text: this.selected_category
            };
          this.categoryTitles.push(t1);

        }else{
          //price
          this.price_value = this.edit_response.price;
          this.price_div_display = "block";
          //public_check
          this.public_check_visibility = 'visible';

          //subject and category
          let s1 = {
            value: this.selected_subject,
            text: this.selected_subject
          };
          this.subjectsTitles.push(s1);

          //select category
          let t1 = {
            value: this.selected_category,
            text: this.selected_category
          };
          this.categoryTitles.push(t1);

        }

        //if is author

        if(this.is_Author){
          this.price_disabled = false;
        }
        //set terms
        this.fill_words_and_translates();

      },
    fill_words_and_translates(){

      var rsp_terms_length = this.edit_response.terms.length;
      //if length is <= 6 then simple for loop
      if(rsp_terms_length <= 6){
        for (var index = 0; index < rsp_terms_length; index++){
          this.terms[index][0] = this.edit_response.terms[index].name;
          this.terms[index][1] = this.edit_response.terms[index].definition;
          this.terms[index][2] = this.edit_response.terms[index].termId;
        }
      }else {
        //for loop and add components
        for (var index = 0; index < 6; index++) {
          this.terms[index][0] = this.edit_response.terms[index].name;
          this.terms[index][1] = this.edit_response.terms[index].definition;
          this.terms[index][2] = this.edit_response.terms[index].termId;
        }

        for (var index = 6; index < rsp_terms_length; index++) {
          var next_index = index + 1;

          tweets.push({
            span_class: 'word_index_'+next_index,
              input_id: "word_" + next_index,
            translate_input_id: "translate_" + next_index,
            translate_span_id: "t_e_span_" + next_index,
            translate_example_id: "translate_example_" + next_index,
            word_val: this.edit_response.terms[index].name,
            translate_val: this.edit_response.terms[index].definition,
            termId: this.edit_response.terms[index].termId,
            number: next_index
          });

          this.number++;
        }

      }
    },
      addNewWordComponent: function () {
        var num = this.number;
        var span_class = "word_index_" + num;
        var input_id = "word_" + num;
        var translate_input_id = "translate_" + num;
        var translate_span_id = "t_e_span_" + num;
        var translate_example_id = "translate_example_" + num;

        tweets.push({
          span_class: 'word_index_'+num,
          input_id: "word_" + num,
          translate_input_id: "translate_" + num,
          translate_span_id: "t_e_span_" + num,
          translate_example_id: "translate_example_" + num,
          number: num
        });

        this.number = ++num;
      },
      btnClick: function () {
        var name = document.getElementById('name').value;

        var public_checkbox = document.getElementById("public_check_sign");
        var public_checkbox_visibility_status = window.getComputedStyle(public_checkbox).getPropertyValue('visibility');
        var price = document.getElementById("price").value;

        // check if module is private or public
        if(this.is_Author){
          if (public_checkbox_visibility_status == "visible") {
            if(name == ''){
              alert('Enter name!');
              return;
            }
            if(this.selected_subject == 'default'){
              alert('Choose subject!');
              return;
            }
            if(this.selected_category == 'default'){
              alert('Choose category!');
              return;
            }

            if(price == ''){
              alert('Enter price!');
              return;
            }
            this.editSet();
          }else{
            if(name != ''){
              this.editSet();
            }
          }
        }else{
          if(name != ''){
            this.editSet();
          }
        }
      },
      editSet: function () {
        //collect all data from form
        var name = document.getElementById('name').value;
        var userId = this.$cookies.get('userId');
        var isLocal;
        var price;
        var moduleId = this.moduleId;
        var category;
        //if user marked public checked and wrote price then also add it to the form

        var public_checkbox = document.getElementById("public_check_sign");
        var public_checkbox_visibility_status = window.getComputedStyle(public_checkbox).getPropertyValue('visibility');
        price = document.getElementById("price").value;
        if(this.is_Author){
          //if public or not
          if (public_checkbox_visibility_status == "visible" && price != "") {
            isLocal = 0;
          }else{
            isLocal = 1;
            price = 0;
          }
          category = this.selected_category;
        }else{
          isLocal = this.edit_response.isLocal;
          price = this.edit_response.price;
          category = this.selected_category;
        }

        var terms = [];

        //getting all words with filled translations
        var num_of_word_divs = document.getElementById("words").childElementCount;

        for(var i = 1; i <= num_of_word_divs; i++){
          var word = document.getElementById('word_'+ i + '').value;
          var translate = document.getElementById('translate_' + i + '').value;
          var termId = document.getElementById('word_' + i + '').getAttribute('data-termid');
          if (word !== '' && translate !== '') {
            termId = (termId == '' || termId == null)? '0':termId;
            var term = {
              "TermId": termId,
              "Name": word,
              "ModuleId": moduleId,
              "Definition": translate
            };
            terms.push(term);
          }
        }

        // if terms object is empty
        if(Object.keys(terms).length == 0){
          alert('Enter minimum one word with translation');
        }

        var data = {
          "UserId": userId,
          "Category": category,
          "ModuleId": moduleId,
          "Name": name,
          "IsLocal": isLocal,
          "Price": price,
          "Terms": terms
        };
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$cookies.get('user_session')
          }
        };

        axios.post('https://memeseeds.herokuapp.com/user/update/module', data, config)
          .then(response => {
            var moduleId = response.data.moduleId;
            console.log('getAnswerSuccessfully: ' + moduleId);

            this.$router.push('/myModule/' + moduleId);
          })
          .catch(error => {
            console.log(error)
          });
      },
      setTranslation: function (evt) {
        var typed_div = evt.target.id;
        var typed_div_number = typed_div[typed_div.length - 1];

        var translate_example_element = document.getElementById("translate_example_" + typed_div_number + "");
        var translation = translate_example_element.value;

        var translate_field = document.getElementById("translate_" + typed_div_number + "");
        translate_field.value = translation;

        translate_example_element.style.display = "none";
      },
      check_translation: function(evt){
        var typed_div = evt.target.id;
        var type_div_num = typed_div.match(/\d/g).join('');

        // //text for translation
        var entering_line = document.getElementById("translate_" + type_div_num).value;
        var translation_example = document.getElementById("translate_example_" + type_div_num).value;
        if(entering_line != '' && !(translation_example.includes(entering_line))){
          document.getElementById("translate_example_" + type_div_num).style.display = 'none';
        }else{
          if(translation_example.length == entering_line.length){
            document.getElementById("translate_example_" + type_div_num).style.display = 'none';
          }else{
            document.getElementById("translate_example_" + type_div_num).style.display = 'block';
          }
        }
      },
      switchLanguages: function () {
        //get values of selected languages
        var lang1 = document.getElementById("lang1");
        var value1 = lang1.options[lang1.selectedIndex].value;

        var lang2 = document.getElementById("lang2");
        var value2 = lang2.options[lang2.selectedIndex].value;

        lang1.value = value2;
        lang2.value = value1;
      }, asynctranslation: function (evt) {
        var language_checkbox = document.getElementById("language_check_sign");
        var language_checkbox_visibility_status = window.getComputedStyle(language_checkbox).getPropertyValue('visibility');
        if (language_checkbox_visibility_status == "visible") {
          this.inputkeyUp(evt);
        }
      },
      inputkeyUp: function (evt) {
        // sending word for translation
        var typed_div = evt.target.id;
        var typed_div_number = typed_div[typed_div.length - 1];
        //text for translation
        var souceText = document.getElementById("" + typed_div + "").value;
        //getting short value and full name of source language
        var sourceLanguageValue = document.getElementById('lang1').value;
        var sourceLanguage_fullName = document.getElementById('lang1').selectedOptions[0].text;
        //getting short value and full name of Target language
        var targetLanguageValue = document.getElementById('lang2').value;
        var targetLanguage_fullName = document.getElementById('lang2').selectedOptions[0].text;


        if (souceText != "") {

          //send on server
          let config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.$cookies.get('user_session')
            }
          };

          var data = {
            "SourceText": souceText,
            "SourceLanguage": sourceLanguage_fullName,
            "TargetLanguage": targetLanguage_fullName
          };

          axios.post('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/translate', data, config)
            .then(response => {
              var translation = response.data.transResponse;
              if (translation != "") {
                var element = document.getElementById("translate_example_" + typed_div_number + "");
                element.value = translation;
                element.style.display = "block";
              } else {
                //send via js
                console.log('sending for translation via js');
                var link = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLanguageValue +
                  '&tl=' + targetLanguageValue + '&dt=t&q=' + souceText;
                axios.post(link)
                  .then(response => {
                    var translation = response.data[0][0][0];

                    var element = document.getElementById("translate_example_" + typed_div_number + "");
                    element.value = translation;
                    element.style.display = "block";
                  })
                  .catch(error => {
                    console.log(error)
                  });

              }
            })
            .catch(error => {
              console.log(error)
            });

        } else {
          var element = document.getElementById("translate_example_" + typed_div_number + "");
          element.style.display = "none";
        }

      },
      public_check: function () {

        var public_checkbox = document.getElementById("public_check_sign");
        var public_checkbox_visibility_status = window.getComputedStyle(public_checkbox).getPropertyValue('visibility');

        if(this.is_Author){
          if (public_checkbox_visibility_status == "visible") {
            public_checkbox.style.visibility = "hidden";
            document.getElementById("price_div").style.display = "none";
            document.getElementById('price').removeAttribute('required');
          } else {
            public_checkbox.style.visibility = "visible";
            document.getElementById("price_div").style.display = "block";
            document.getElementById("price").setAttribute('required', 'required');

            if(this.edit_response.isLocal){
              this.get_subjects_and_categories();
            }
          }
        }
      },
    get_subjects_and_categories: function () {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$cookies.get('user_session')
        }
      };

      axios.get('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/shop/subjects/categories', config)
        .then(response => {
          this.filterResponse = response.data;
          let sb = Object.keys(this.filterResponse);
          let k = {value: 'default', text: 'Subject'};
          let sub = [k];
          for (let i = 0; i < sb.length - 1; i++) {
            if (sb[i] != 'default') {
              let s1 = {
                value: sb[i],
                text: sb[i]
              };
              sub.push(s1);
            }
          }

          this.subjectsTitles = sub;
          this.noSubject = false;
        })
        .catch(error => {
          this.load_module_successfull_display = 'block';
          this.form_display = 'none';
        });

    },
      selectSubject: function() {
        this.selected_subject = subj_select.value;
        if (this.edit_response.isLocal) {
          this.categoryTitles = [];
          if (this.selected_subject != 'default') {
            this.categoryTitles.push({value: 'default', text: 'Category'});
            let sub = this.filterResponse[this.selected_subject];
            for (let i = 0; i < sub.length; i++) {
              this.categoryTitles.push(sub[i]);
            }
            this.noSubject = false;
          } else {
            this.noSubject = true;
          }
          this.selected_category = 'default';
        }
      },
      language_check: function () {
        var language_checkbox = document.getElementById("language_check_sign");
        var language_checkbox_visibility_status = window.getComputedStyle(language_checkbox).getPropertyValue('visibility');
        if (language_checkbox_visibility_status == "visible") {
          language_checkbox.style.visibility = "hidden";
          document.getElementById("lang1").setAttribute('disabled', 'disabled');
          document.getElementById("lang2").setAttribute('disabled', 'disabled');
        } else {
          language_checkbox.style.visibility = "visible";
          document.getElementById("lang1").removeAttribute('disabled');
          document.getElementById("lang2").removeAttribute('disabled')
        }
      }
    }
  }

</script>

<style scoped>

  input:disabled{
    cursor: not-allowed;
    background: #e9ecef;
  }
  select:disabled{
    cursor: not-allowed;
    background: #e9ecef;
  }


  #public_checkbox {
    cursor: pointer;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
    display: inline-block;
    background: white;
    height: 1.2vw;
    width: 1.2vw;
  }

  #public_checkbox:hover {
    background: #ffdede;
  }

  #public_checkbox:active {
    background: #7e7e8d61;
  }

  #public_check_sign {
    cursor: pointer;
    visibility: hidden;
    font-size: 160%;
    padding: 0;
    margin-top: -15px;
  }

  #language_checkbox {
    cursor: pointer;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
    display: inline-block;
    background: white;
    height: 1.2vw;
    width: 1.2vw;
  }

  #language_checkbox:hover {
    background: #ffdede;
  }

  #language_checkbox:active {
    background: #7e7e8d61;
  }

  #language_check_sign {
    cursor: pointer;
    visibility: hidden;
    font-size: 160%;
    padding: 0;
    margin-top: -15px;
  }

  #words {
    margin-top: 50px;
  }

  #name {
    height: 100%;
    width: 90%;
    border-color: transparent;
    background: white;
  }

  #category {
    width: 90%;
    border-color: transparent;
  }

  #create_btn {
    cursor: pointer;
    width: 100%;
    border: none;
    padding-top: 5px;
    background: #1894a5;
    color: white;
    border-radius: 15px;
  }

  #create_btn:active {
    background: #12496d;
  }

  #addmore_btn {
    margin-left: 5px;
    border: none;
    width: 80%;
    padding-top: 4px;
    background: #f59699;
    color: white;
    border-radius: 15px;
    margin-bottom: 30px;
  }

  #addmore_btn:hover {
    background: #f56e72 !important;
  }

  >>>.word_input {
    border-color: transparent;
  }

  >>>.translate_input {
    border-color: transparent;
  }

  >>>.translate_example {
    background: antiquewhite;
    display: none;
    pointer-events: none;
    border: transparent;
  }


  .newword_div {
    margin-bottom: 15px;
  }

  #lang1 {
    height: 100%;
    width: 100%;
    border-color: transparent;
  }

  #lang2 {
    height: 100%;
    width: 100%;
    border-color: transparent;
  }

  #language_switch_div {
    padding-right: 0;
    padding-left: 0;

  }

  #language_switch_img {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition-property: transform;
    transition-duration: 0.1s;
  }

  #language_switch_img:active {
    transform: rotate(180deg);
  }

  #subject {
    width: 90%;
    border-color: transparent;
  }

  #price {
    border: transparent;
    display: inline-block;
    width: 70%;
  }

  #price::-webkit-inner-spin-button,
  #price::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  #language_check_div {
    font-size: 20px;
  }

  #public_check_div {
    margin-bottom: auto;
    margin-top: auto;
    font-size: 20px;
  }

  #coin{
    height: 90%;
    position: absolute;
  }





  @media all and (min-width: 769px) and (max-width: 1024px) {
    #public_checkbox {
      width: 2vw;
      height: 2vw;
    }

    #language_checkbox {
      width: 2vw;
      height: 2vw;
    }

    #price {
      width: 85%;
      font-size: 20px;
    }
  }

  @media all and (max-width: 768px) {
    #public_checkbox {
      width: 2vw;
      display: inline-block;
      height: 2vw;
    }

    #language_checkbox {
      width: 2vw;
      height: 2vw;
    }

    #price {
      width: 10px;
      font-size: 20px;
    }
  }


  /***********************************************/

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;

    width: 100%;
    bottom: 0;
  }

  .hidden {
    display: none;
  }

</style>
