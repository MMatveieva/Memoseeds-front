<template>
  <div style="display: flex;flex-direction: column;justify-content: space-between; height: 100vh">
    <Header></Header>

    <!--Add my components-->

    <div>
      <div v-bind:style="{display: load_module_successfull_display}" style="text-align: center"><h1>Cannot load module.
        Please, try again</h1></div>
      <form v-bind:style="{display: form_display}" id="new_set_form" onsubmit="return false">
        <div class="container">
          <h2>{{title}}</h2>
          <div class="row" style="margin-bottom: 15px">
            <div class="col-sm-3">
              <input id="name" type="text" placeholder="Name" v-bind:value="name_value" required>
            </div>
            <div class="col-sm-3">
              <!--<input id="category" type="text" placeholder="Category...">-->
              <b-form-select v-model="selected_category" :options="categoryTitles"
                             v-bind:disabled="noSubject"></b-form-select>
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
              <b-form-select v-bind:value="selected_subject" :options="subjectsTitles"></b-form-select>
            </div>
            <div class="col-sm-3 row" id="public_check_div">

              <div class="col-sm-6">
                <span>Public</span>
                <div id="public_checkbox">
                  <div id="public_check_sign" v-bind:style="{visibility: public_check_visibility}">&#10003;</div>
                </div>
              </div>

              <div class="col-sm-6" style="padding-right: 0; padding-left: 0">
                <input id="price" type="number" v-bind:value="price_value" placeholder="Price"
                       :disabled="price_disabled">
                <div style="display: inline; margin-left: 5px">
                  <img id="coin" src="../css/images/coin.png">
                </div>
              </div>

            </div>
            <div class="col-sm-5 row">
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
              <div class="col-sm-6"><span class="word_index_1">1. </span><input :data-termid="terms[0][2]"
                                                                                v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_1"
                                                                                style="width: 70%"
                                                                                v-bind:value="terms[0][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6">
                <input type="text" class="translate_input" id="translate_1" style="width: 70%"
                       placeholder="Enter translation or definition" v-bind:value="terms[0][1]">
                <span id="t_e_span_1" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                  <input type="text" id="translate_example_1" class="translate_example"
                         style="cursor: pointer;width: 70%;margin-top:5px;">
                </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_2">2. </span><input :data-termid="terms[1][2]"
                                                                                v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_2"
                                                                                style="width: 70%"
                                                                                v-bind:value="terms[1][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6">
                <input type="text" class="translate_input" id="translate_2" style="width: 70%"
                       placeholder="Enter translation or definition" v-bind:value="terms[1][1]">
                <span id="t_e_span_2" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_2" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_3">3. </span><input :data-termid="terms[2][2]"
                                                                                v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_3"
                                                                                style="width: 70%"
                                                                                v-bind:value="terms[2][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_3" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[2][1]">
                <span id="t_e_span_3" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_3" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_4">4. </span><input :data-termid="terms[3][2]"
                                                                                v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_4"
                                                                                style="width: 70%"
                                                                                v-bind:value="terms[3][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_4" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[3][1]">
                <span id="t_e_span_4" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_4" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_5">5. </span><input :data-termid="terms[4][2]"
                                                                                v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_5"
                                                                                style="width: 70%"
                                                                                v-bind:value="terms[4][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_5" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[4][1]">
                <span id="t_e_span_5" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_5" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_6">6. </span><input :data-termid="terms[5][2]"
                                                                                v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_6"
                                                                                style="width: 70%"
                                                                                v-bind:value="terms[5][0]"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_6" style="width: 70%"
                                           placeholder="Enter translation or definition" v-bind:value="terms[5][1]">
                <span id="t_e_span_6" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" v-on:click="setTranslation" id="translate_example_6" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <component v-for="item in items" ref="itemRefs" :is="item" :key="item.name"></component>
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
  import Header from './Header'

  var Reusable = {
    template: '<div class="row newword_div">' +
      '<div class="col-sm-6">' +
      '<span :class="span_class">{{number}}. </span>' +
      '<input :data-termid="termId" v-on:keyup="asynctranslation" type="text" ' +
      'class="word_input" :id="input_id" style="width: 70%" placeholder="Enter a word or term" v-bind:value="word_val"></div>' +
      '<div class="col-sm-6">' +
      '<input type="text" class="translate_input" :id="translate_input_id" style="width: 70%" ' +
      'placeholder="Enter translation or definition" v-bind:value="translate_val">' +
      '<span :id="translate_span_id" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">' +
      '<input type="text" v-on:click="setTranslation" :id="translate_example_id" class="translate_example" ' +
      'style="cursor: pointer;width: 70%;margin-top:5px;"></span>' +
      '</div>' +
      '</div>',

    props: {
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
    data() {
      return {
        bar: 'Bar'
      }
    }, methods: {
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
              'Access-Control-Allow-Origin': '*',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + this.$cookies.get('user_session')
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
  };

  export default {
    name: "EditModule",
    components: {Header},
    data() {
      return {
        load_module_successfull_display: 'none',
        form_display: 'block',
        title: 'Edit Set',
        create_btn_title: 'EDIT SET',
        moduleId: '',
        filterResponse: [],
        subjectsTitles: [],
        categoryTitles: [],
        selected_subject: 'default',
        selected_category: 'default',
        noSubject: true,
        number: 7,
        items: [],
        edit_response: {},
        name_value: '',
        price_value: '',
        price_disabled: true,
        public_check_visibility: 'hidden',
        public_check_disabled: true,
        terms: [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']]
      }
    },
    created: function () {

      var path = this.$route.path.split('/');
      if (isNaN(path[path.length - 1])) {
        this.load_module_successfull_display = 'block';
        this.form_display = 'none';
        return;
      } else {
        this.moduleId = path[path.length - 1];
      }

      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'subjectsapplication/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.$cookies.get('user_session')
        }
      };

      var userId = this.$cookies.get('userId');
      var moduleId = this.moduleId;
      axios.get('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/user/' + userId + '/modules/' + moduleId, config)
        .then(response => {
          //select subject
          this.selected_subject = response.data.subject;
          //select category
          this.selected_category = response.data.category;
          this.edit_response = response.data.module;
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
        if (this.edit_response.isLocal) {
          // 4) else if not public (is local) then if subject/category are set => then set them
          //subject and category
          var s1 = (this.selected_subject == 'default') ?
            {
              value: 'default',
              text: 'Subject'
            } : {
              value: this.selected_subject,
              text: this.selected_subject
            };

          this.subjectsTitles.push(s1);

          //select category
          var t1 = (this.selected_category == 'default') ?
            {
              value: 'default',
              text: 'Category'
            } : {
              value: this.selected_category,
              text: this.selected_category
            };
          this.categoryTitles.push(t1);

        } else {
          //price
          this.price_value = this.edit_response.price;
          this.price_disabled = false;
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

        // set terms
        var rsp_terms_length = this.edit_response.terms.length;
        //if length is <= 6 then simple for loop
        if (rsp_terms_length <= 6) {
          for (var index = 0; index < rsp_terms_length; index++) {
            this.terms[index][0] = this.edit_response.terms[index].name;
            this.terms[index][1] = this.edit_response.terms[index].definition;
            this.terms[index][2] = this.edit_response.terms[index].termId;
          }
        } else {
          //for loop and add components
          for (var index = 0; index < 6; index++) {
            this.terms[index][0] = this.edit_response.terms[index].name;
            this.terms[index][1] = this.edit_response.terms[index].definition;
            this.terms[index][2] = this.edit_response.terms[index].termId;
          }

          for (var index = 6; index < rsp_terms_length; index++) {
            //add component
            var num = this.number;
            var span_class = "word_index_" + num;
            var input_id = "word_" + num;
            var translate_input_id = "translate_" + num;
            var translate_span_id = "t_e_span_" + num;
            var translate_example_id = "translate_example_" + num;
            var word_val = this.edit_response.terms[index].name;
            var translate_val = this.edit_response.terms[index].definition;
            var termId = this.edit_response.terms[index].termId + '';

            const renderComponent = {
              render(h) {
                return h(Reusable, {
                  class: ['foo'],
                  props: {
                    span_class: span_class,
                    input_id: input_id,
                    translate_input_id: translate_input_id,
                    translate_span_id: translate_span_id,
                    translate_example_id: translate_example_id,
                    word_val: word_val,
                    translate_val: translate_val,
                    termId: termId,
                    number: --num,
                    name: 'Foo',
                  }
                })
              }
            };

            this.items.push(renderComponent);
            this.number = ++num;
          }

        }

      },
      addNewWordComponent() {
        var num = this.number;
        var span_class = "word_index_" + num;
        var input_id = "word_" + num;
        var translate_input_id = "translate_" + num;
        var translate_span_id = "t_e_span_" + num;
        var translate_example_id = "translate_example_" + num;

        const renderComponent = {
          render(h) {
            return h(Reusable, {
              class: ['foo'],
              props: {
                span_class: span_class,
                input_id: input_id,
                translate_input_id: translate_input_id,
                translate_span_id: translate_span_id,
                translate_example_id: translate_example_id,
                number: --num,
                name: 'Foo',
              }
            })
          }
        };

        this.items.push(renderComponent);
        this.number = ++num;
      },
      btnClick: function () {
        var name = document.getElementById('name').value;

        var public_checkbox = document.getElementById("public_check_sign");
        var public_checkbox_visibility_status = window.getComputedStyle(public_checkbox).getPropertyValue('visibility');
        var price = document.getElementById("price").value;

        // check if module is private or public
        if (public_checkbox_visibility_status == "visible") {
          if (this.selected_subject == 'default') {
            alert('Choose subject!');
            return;
          }
          if (this.selected_category == 'default') {
            alert('Choose category!');
            return;
          }

          if (price == '') {
            alert('Enter price!');
            return;
          }
          this.editSet();
        } else {
          if (name != '') {
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
        //if user marked public checked and wrote price then also add it to the form

        var public_checkbox = document.getElementById("public_check_sign");
        var public_checkbox_visibility_status = window.getComputedStyle(public_checkbox).getPropertyValue('visibility');
        price = document.getElementById("price").value;
        //if public or not
        if (public_checkbox_visibility_status == "visible" && price != "") {
          isLocal = 0;
        } else {
          isLocal = 1;
          price = 0;
        }

        var terms = [];

        //getting all words with filled translations
        var num_of_word_divs = document.getElementById("words").childElementCount;

        for (var i = 1; i <= num_of_word_divs; i++) {
          var word = document.getElementById('word_' + i + '').value;
          var translate = document.getElementById('translate_' + i + '').value;
          var termId = document.getElementById('word_' + i + '').getAttribute('data-termid');
          if (word !== '' && translate !== '') {
            termId = (termId == '' || termId == null) ? '0' : termId;
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
        if (Object.keys(terms).length == 0) {
          alert('Enter minimum one word with translation');
          return;
        }

        var data = {
          "UserId": 8,
          "ModuleId": moduleId,
          "Name": name,
          "IsLocal": isLocal,
          "Price": price,
          "Terms": terms
        };

        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + this.$cookies.get('user_session')
          }
        };

        axios.get('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/user/update/modules', data, config)
          .then(response => {
            var moduleId = response.data.moduleId;

            this.$router.push('/mymodule/' + moduleId);
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
              'Access-Control-Allow-Origin': '*',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + this.$cookies.get('user_session')
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
        if (public_checkbox_visibility_status == "visible") {
          public_checkbox.style.visibility = "hidden";
          document.getElementById("price").setAttribute('disabled', 'disabled');
          document.getElementById('price').removeAttribute('required');
        } else {
          public_checkbox.style.visibility = "visible";

          document.getElementById("price").removeAttribute('disabled');
          document.getElementById("price").setAttribute('required', 'required');
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

<style>

  input:disabled {
    cursor: not-allowed;
    background: #e9ecef;
  }

  select:disabled {
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
    background: #1894a5;
    color: white;
    border-radius: 15px;
    margin-bottom: 30px;
  }

  .word_input {
    border-color: transparent;
  }

  .translate_input {
    border-color: transparent;
  }

  .translate_example {
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

  #coin {
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
