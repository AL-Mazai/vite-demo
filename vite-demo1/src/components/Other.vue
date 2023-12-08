<template>
    <div>
        <!-- 使用这个签名组件 -->
        <vueEsign
            ref="esign"
            class="mySign"
            :width="300"
            :height="300"
            :lineColor="lineColor"
            :bgColor="bgColor"
            :lineWidth="lineWidth"
            :isCrop="false"
        />
        <div class="dialog-footer">
            <el-button @click="predict" type="primary">预测</el-button>
            <el-button @click="reset">清空</el-button>
        </div>
        <div class="predict-result">
            预测结果：{{ predictResult }}
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import vueEsign from "vue-esign";
import axios from 'axios';

//画布相关属性
const lineWidth = ref(7);
const lineColor = ref("#ffffff");
const bgColor = ref("#000000");
const image = ref("");
const esign = ref(null);
const predictResult = ref("")

// 清空画板
const reset = () => {
    // esign.value.reset();
    window.location.reload(true);
};

// 将图片Base64编码传给后端进行识别
const predict = () => {
    // 通过 esign.value.generate() 生成base64图像
    esign.value
        .generate()
        .then((res) => {
            // 将生成的签名图像设置给 image.value
            image.value = res;
            // 使用 axios 发送 POST 请求到 Flask 后端的预测接口
            axios.post('http://127.0.0.1:5000/predict', image.value)
                .then((res) => {
                    // 打印预测结果
                    console.log(res);
                    predictResult.value = res.data
                })
                .catch((err) => {
                    // 处理预测请求失败的情况
                    alert(err);
                    console.log(err);
                });
        })
        .catch((err) => {
            // 处理签名图像生成失败的情况
            alert(err);
            console.log(err);
        });
};
</script>

<style scoped>
.mySign {
    border: 5px #d2d2c8 solid;
}

.dialog-footer {
    margin-top: 2vh;
}
.predict-result{
    margin-top: 2vh;
    font-size: 18px;
}
</style>
