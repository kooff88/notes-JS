## GLSL （ OpenGL Shading Language ）

在可编程管线中我们必须要纯手写顶点和片源着色器，这里就要求必须使用 GLSL，自行编译，链接，使用。

### 变量

变量的名称可以使用字母，数字以及下划线，但变量名不能以数字开头。变量名不能以 gl\_作为前缀，这是 GLSL 保留前缀。

### 基本类型

| 数据类型         | 描述                                                                             |
| ---------------- | -------------------------------------------------------------------------------- |
| void             | 表示空类型，作为函数的返回类型，表示这个函数不返回值                             |
| bool             | 布尔类型，可以是 true 和 false,以及可以产生布尔值的表达式                        |
| int              | 整形，代表至少包含 16 位的有符号的整数。可以是十进制，十六进制，八进制           |
| float            | 浮点型                                                                           |
| bvec2            | 包含 2 个布尔成分的向量                                                          |
| bvec3            | 包含 3 个布尔成分的向量                                                          |
| bvec4            | 包含 4 个布尔成分的向量                                                          |
| ivec2            | 包含 2 个整形成分的向量                                                          |
| ivec3            | 包含 3 个整形成分的向量                                                          |
| ivec4            | 包含 4 个整形成分的向量                                                          |
| mat2 或者 mat2x2 | 2x2 的浮点数矩阵类型                                                             |
| mat3 或者 mat3x3 | 3×3 的浮点数矩阵类型                                                             |
| mat4x4           | 4x4 的浮点数矩阵类型                                                             |
| mat2x3           | 2 列 3 行的浮点矩阵（ OpenGL 的矩阵是列主顺序的 ）                               |
| mat2x4           | 2 列 4 行的浮点矩阵                                                              |
| mat3x2           | 3 列 2 行的浮点矩阵                                                              |
| mat3x4           | 3 列 4 行的浮点矩阵                                                              |
| mat4x2           | 4 列 2 行的浮点矩阵                                                              |
| mat4x3           | 4 列 3 行的浮点矩阵                                                              |
| sampler1D        | 用于内建的纹理函数中引用指定的 1D 纹理的句柄。只可以作为一致变量或者函数参数使用 |
| sampler2D        | 二维纹理句柄                                                                     |
| sampler3D        | 三维纹理句柄                                                                     |
| samplerCube      | cube map 纹理句柄                                                                |
| sampler1DShadow  | 一维深度纹理句柄                                                                 |
| sampler2DShadow  | 二维深度纹理句柄                                                                 |


### 精度

通过设置着色器数值的精度可以更好的配置资源，可以根据需要，在不太影响渲染效果前提下，可以尽可能降低远算精度。

| lowp      | 低精度                                                                |
| mediump  | 中精度                                                                |
| highp |  高精度                                                               |

例:
```
precision highp float;  
// precition 关键字可以批量声明一些变量精度。 
// 上一行表示 顶点着色器中所有浮点数精度为高精度。

```


### 结构体

结构体可以组合基本类型和数组来形成用户自定义的类型。在定义一个结构体的同时，可以定义一个结构体实例。或后面来定义。

`=` 为结构体赋值
`==`, `!=` 来判断两个结构体是否相等。

```
mySurface = secondSurface;

mySurface == secondSurface;
```

只有结构体中的每个成分都相等，那么这两个结构体才是相等的。访问结构体内部成员使用`.`（点语法）来访问。

```
vec3 color = mySurface.color + secondSurface.color
```

结构体至少包含一个成员。 固定大小的数组也可以被包含在结构体中。GLSL 的结构体不支持嵌套定义，只有预先声明的结构体可以嵌套其中。

```
struct myStruct {
    vec3 points[3]; // 固定大小的数组是合法的
    suface surf; // 可以，之前已定义了
    struct velocity {  // 不合法 float speed
        vec3 direction;
    } velo;
}

subSurface sub; // 不合法，没有预选声明

struct subSurface {
    int id
} ID

```

### 数组

GLSL 中只可以使用一维数组。数组的类型可以是一切基本类型或结构体。下面几种数组声明是合法的：

```
1. vec4 lightPositions[8];

2. lightPos[] = lightPositions;const int numSurface = 5;

3. suface myFiveSurface[numSurfaces];float[5] values;
```

指定显示大小的数组可以作为函数的参数或者是返回值，也可以作为结构体的成员。数组类型内建了一个 length()函数，返回长度。

`lightPositions.length()` // 返回数组的大小 8

最后，不能定义数组的数组.

### 修饰符

变量的声明可以使用如下的修饰符。

| 修饰符           | 描述                                                                                                                                                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| const            | 常量值必须在声明的是初始化。它是只读                                                                                                                                                                                                                                                                                |
| attribute        | 表示只读的顶点数据，只用在顶点着色器中。数据来自当前的顶点状态或者定点数组。它必须是全局范围声明的，不能再函数内部。一个 attribute 可以是浮点数类型的标量，向量，或者矩阵。不可以是数组或者是结构体。                                                                                                               |
| uniform          | 一致变量。在着色器执行期间一致变量的值是不变的。与 const 常量不同的是，这个值在编译时期是未知的，是由着色器外部初始化的。一致变量在定点着色器和片元着色器之间是共享的。它也只能在全局范围进行声明                                                                                                                   |
| varying          | 顶点着色器的输出。 例如颜色或者纹理坐标，                                                                                                                                                                                                                                                                           |
| centorid varying | 在没有多重采样的情况下，与 varying 是一样的意思。在多重采样时，centorid varying 在光栅化的图形内部进行求值而不是在片元中的固定位置求值                                                                                                                                                                              |
| invariant        | （不变量）用于表示顶点着色器的输出和任何匹配片元着色器的输入，在不同的着色器中计算的值必须是一致的。所有的数据流和控制流，写入一个 invariant 变量的是一致的。编译器为了保证结果是完全一致的，需要放弃那些可能会导致不一致值得潜在的优化。除非必要，不要使用这个修饰符。在多通道渲染中避免 z-fighting 可能会使用到。 |
| in               | 用在函数的参数中，表示这个参数是输入的，在函数中改变这个值，并不会影响对调用的函数产生副作用。（相当于 C 语言的传值），这个是函数参数默认的修饰符                                                                                                                                                                   |
| out              | 用在函数的参数中，表示该参数是输出参数，值是会改变的。                                                                                                                                                                                                                                                              |
| inout            | 用在函数的参数，表示这个参数即是输入参数也是输出参数。                                                                                                                                                                                                                                                              |

### 内置变量

内置变量可以与固定函数功能进行交互。 在使用前不需要声明。 顶点着色器可用的内置变量如下表：

| 名称                  | 类型  | 描述                                                                                    |
| --------------------- | ----- | --------------------------------------------------------------------------------------- |
| gl_Color              | vec4  | 输入属性-表示顶点的主颜色                                                               |
| gl_SecondaryColor     | vec4  | 输入属性 - 表示顶点的辅助颜色                                                           |
| gl_Normal             | vec3  | 输入属性-表示顶点的法线值                                                               |
| gl_Vertex             | vec4  | 输入属性-表示物体空间的定点位置                                                         |
| gl_MultiTexCoordn     | vec4  | 输入属性-表示顶点的第 n 个纹理的坐标                                                    |
| gl_FogGoord           | float | 输入属性-表示顶点的雾坐标                                                               |
| gl_Position           | vec4  | 输入属性-变换后的顶点的位置，用于后面的固定的裁剪等操作。所有的顶点着色器都必须写这个值 |
| gl_ClipVectex         | vec4  | 输出坐标，用于用户裁剪平面的裁剪                                                        |
| gl_PointSize          | float | 点的大小                                                                                |
| gl_FrontColor         | vec4  | 正面的主颜色的 varying 输出                                                             |
| gl_BackColor          | vec4  | 背面主颜色的 varying 输出                                                               |
| gl_FrontSeondaryColor | vec4  | 正面的辅助主颜色的 varying 输出                                                         |
| gl_BackSecondaryColor | vec4  | 背面的辅助主颜色的 varying 输出                                                         |
| gl_TextCoord[]        | vec4  | 纹理坐标的数组 varing 输出                                                              |
| gl_FogFragCoord       | float | 雾坐标的 varying 输出                                                                   |

片元着色器的内置变量如下表：

| 名称              | 类型  | 描述                                                                                     |
| ----------------- | ----- | ---------------------------------------------------------------------------------------- |
| gl_Color          | vec4  | 包含主颜色的插值只读输入                                                                 |
| gl_SecondaryColor | vec4  | 包含辅助颜色的插值只读输入                                                               |
| gl_TextCoord[]    | vec4  | 包含纹理坐标数组的插值只读输入                                                           |
| gl_FogFragCoord   | float | 包含雾坐标的插值只读输入                                                                 |
| gl_FragCoord      | vec4  | 只读输入，窗口的 x,y,z 和 1/w                                                            |
| gl_FrontFacin     | bool  | 只读输入, 如果是窗口正面图元的一部分，则这个值为 true                                    |
| gl_PointCoord     | vec2  | 点精灵的二维空间坐标范围在（0.0,0.0）到(1.0,1.0)之间，仅用于点图元和点精灵开启的情况下。 |
| gl_FragData[]     | vec4  | 使用 glDrawBuffers 输出的数据数组。不能与 gl_FragColor 结合使用                          |
| gl_FragColor      | vec4  | 输出的颜色用于随后的像素操作                                                             |
| gl_FragDepth      | float | 输出的深度用于随后的像素操作，如果这个值没有被写，则使用固定功能管线的深度值代替。       |

### 表达式

#### 操作符

GLSL 语言的操作符与 C 语言相似。如下：（操作符优先级从高到低排列）

| 操作符         | 描述                                                 |
| -------------- | ---------------------------------------------------- |
| ()             | 用于表达式组合，函数调用，构造                       |
| []             | 数组下表，向量或矩阵的选择器。                       |
| .              | 结构体和向量的成员选择                               |
| ++-            | 前缀或后缀的自增自减操作符                           |
| +-!            | 一元操作符，表示正 负 逻辑非                         |
| \* /           | 乘 除 操作符                                         |
| + -            | 二元操作符 表示 加 减操作                            |
| <> <= >= == != | 小于，大于，小于等于， 大于等于，等于，不等于 判断符 |
| &&             | 逻辑与                                               |
| ^^             | 逻辑排他或(用处基本等于!=)                           |
| ?:             | 条件判断负                                           |
| = += –= \*= /= | 赋值操作符                                           |
| ,              | 表示序列                                             |

像求地址的 & 和 解引用的 \* 操作符不再 GLSL 中出现，因为 GLSL 不能直接操作地址。类型转换操作也是不允许的。  
位操作符(&,|,^,~, <<, >> ,&=, |=, ^=, <<=, >>=)是 GLSL 保留的操作符，将来可能会被使用。还有求模操作（%，%=)也是保留的。

#### 数组访问

数组的下标从 0 开始。合理的范围是[0, size - 1]。跟 C 语言一样。如果数组访问越界了，那行为是未定义的。如果着色器的编译器在  
编译时知道数组访问越界了，就会提示编译失败。

```
vec4 myColor, ambient, diffuse[6],sepcular[6];

myColor = ambient + diffuse[4] + specular[4];

```

#### 构造函数

构造函数可以用于初始化包含多个成员的变量，包括数组和构造体。构造函数也可以用在表达式中。

```
vec3 myNormal = vec3(1.0,1.0,1.0);

greenTint = MyColor + vec3(0.0, 1.0, 0.0);

ivec4 myColor = ivec4(255);

```

还可以使用混合标量和向量的方式来构造，只要你的元素足以填满该向量。

```
vec4 color = vec4(1.0, vec2(0.0, 1.0), 1.0);

vec3 v = vec3(1.0, 10.0, 1.0);

vec3 v1 = vec3(v);

vec2 fv = vec2(5.0, 6.0);

float f = float(fv); // 用x值2.5构造， y值被舍弃

```

对于矩阵，OpenGL 中矩阵是列主序列的。如果只传了一个值，则会构造成对角矩阵，其余的元素为 0.

```
mat3 m3 = mat3(1.0);
```

构造出来的矩阵：

```
1.0 0.0 0.0

0.0 1.0 0.0

0.0 0.0 1.0

```

```
mat2 matrix1 = mat2(1.0, 0.0, 0.0, 1.0);

mat2 matrix2 = mat2( vec2(1.0, 0.0), vec2(0.0, 1.0));

mat2 matrix3 = mat2(1.0);

mat2 matrix4 = mat2(mat4(2.0)) // 会取 4x4 矩阵左上角的 2x2 矩阵

```

构造函数可以用于标量数据类型的转换。 GLSL 不支持隐式或显示的转换，只能通过构造函数来转。其中 int 转为 float 值是一样的。  
float 转为 int 则小数部分被丢弃。 int 或 float 转为 bool, 0 和 0.0 转为 flase, 其余的值转为 true。 bool 转为 int 或者 float,  
false 值转为 0 和 0.0， true 转为 1 和 1.0

```
float f = 1.7;

int I = int(f); // I = 1
```

数组的初始化， 可以在构造函数中传入值来初始化数组中对应的每个值

```
    ivec2 position[3] ivec2[3]((0,0), (1,1), (2,2));

    ivec2 pos2[3] = ivec2[]((3,3), (2,1), (3,1))

```

构造函数也可以对结构体进行初始化。其中顺序和类型要一一对应。

```
    struct surface {
        int index;
        vec3 color;
        float rotate;
    }

    surface mySurface = surface(3, vec3(red, green, blue), 0.5);

```

#### 成分选择

向量中单独的成分可以通过{x,y,z,w},{r,g,b,a}或者{ s,t,p,q }的记法来表示。这些不同的记法用于顶点，颜色， 纹理坐标。  
在成分选择中，你不可以混合使用这些记法。其中{ s,t,p,q }中的 p 替换了纹理的 r 坐标，因为与颜色 r 重复了。

```
vec3 myVec = { 0.5, 0.35, 0.7 };

float r = myVec.r;

float myYz = myVec.yz;

float myQ = myVec.q; // 出错，数组越界访问，q代表第四个元素。

float myRY = myVec.ry; // 不合法，混合使用记法。

```

较特殊的使用方式，你可以重复向量中的元素，或者颠倒其顺序。

```
 // 调换顺序
vec3 yxz = myVec.yxz;

// 重复其中的值
vec4 mySSTT = myVec.sstt;

```

在赋值时，也可以选择你想要的顺序，但是不能重复其中的成分。

```
vec4 myColor = { 0.0, 1.0, 2.0, 1.0 };

myColor.x = -1.0;

myColor.yz = vec2(3.0, 5.0)

myColor.wz = vec2(1.0, 3.0)

myColor.zz = vec2(2.0, 3.0);  // 不合法

```

我们也可以通过使用下标来访问向量或矩阵中的元素。如果越界那行为将是未定义的

```
float myY = myVec[1]
```

在矩阵中，可以通过一维的下标来获得该列的向量( OpenGL 的矩阵是列主序列的 )。二维的小标来获得向量中的元素。

```
mat3 myMat = mat3(1.0);

vec3 myVec = myMat[0]; // 获得第一列向量 1.0, 0.0, 0.0

float f = myMat[0][0]; // 第一列的第一个向量

```

### 控制流

#### 1. 循环

与 C 和 C++ 相似， GLSL 语言也提供了 for, while, do/while 的循环方式。 使用 continue 跳入下一次循环，break 结束循环。

```
//for循环
for (l = 0; l < NUMCount; l++)
{
    if (!ary[l])
        continue;
    a+= ary[l];
}

//while
while (i < num)
{
    sum += ary[i];
    i++;
}

//do while
do{
    color += light[lightNum];
    lightNum--;
}while (lightNum > 0)
```

#### if/else 控制语句

```
if (a> 0)
{
    a = c;
}else{
    a= b;
}

```

#### discard

片元着色器中有一种特殊的控制流成为`discard`。 使用 discard 会退出片元着色器，不执行后面的片元着色操作，片元也不会写入帧缓冲区。

```
if( color.a < 0.9 )

discard;
```

```js
    <!-- 顶点着色器源码 -->
<script id="vertexShader" type="x-shader/x-vertex">
  //attribute声明vec4类型变量apos
  attribute vec4 apos;
  void main() {
    //点渲染的方形区域像素大小
    gl_PointSize = 100.0;
    //顶点坐标apos赋值给内置变量gl_Position
    //逐顶点处理数据
    gl_Position = apos;
  }

</script>
<!-- 片元着色器源码 -->
<script id="fragmentShader" type="x-shader/x-fragment">
  precision lowp float;// 所有float类型数据的精度是lowp
  void main() {
    // 计算方形区域每个片元距离方形几何中心的距离
    // gl.POINTS模式点渲染的方形区域,方形中心是0.5,0.5,左上角是坐标原点,右下角是1.0,1.0，
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    //根据距离设置片元
    if(r > 0.5){
      // 距离方形中心距离大于0.5的片元剪裁舍弃掉
      discard;
    }
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }

</script>

```

#### 函数

在每个 shader 中必须有一个 main 函数。 main 函数中的 void 参数是可选的，但返回值是 void 是必须的。

```
    void main(void) {
        ...
    }

```

GLSL 中的函数，必须是在全局范围定义和声明的。不能再函数定义中声明或定义函数。函数必须有返回类型，参数是可选的。  
参数是可选的。 参数的修饰符( in, out, inout, const 等 ) 是可选的。

```
    // 函数声明
    bool isAnyNegative(const vec4 v);
    // 函数调用void main(void)
    {
        bool isNegative = isAnyNegative(gl_Color);
    }

    // 定义
    bool isAnyNegative(const vec4 v) {
    if (v.x < 0.0 || v.y < 0.0 || v.z < 0.0 || v.w < 0.0)
        return true;
    else
        return false;
    }

```

结构体和数组也可以作为函数的参数。如果是数组作为函数的参数，则必须定制其大小。在调用传参时，只传数组名可以了。

```
vec4 sumVectors(int sumSize, vec4 v[10]);

void main(){
    vec4 myColor[10];
    vec4 sumColor = sumVectors(5, myColors);
}

vec4 sumVectors(int sumSize, vec4 v[10]) {
    int i = 0;
    vec4 sum = vec4(0.0);
    for(i=0; i < sumSize; ++i){
        sum += v[i];
    }
    return sum;
}

```

GLSL 的函数是支持重载的。函数可以同名但其参数类型或者参数个数不同即可。

```
float sum(float a, float b)
{
    return a + b;
}

vec3 sum(vec3 v1, vec3 v2)
{
    return v1 + v2;
}

```

### 基础类型间的运算：

glsl 中没有隐式类型转换，原则上 glsl 要求任何表达式左右两侧(l-value)，(r-value)的类型必须一致，也就是说以下表达式都是错的。

```
int a =2.0; //错误,r-value为float 而 lvalue 为int.
int a =1.0+2;
float a =2;
float a =2.0+1;
bool a = 0;
vec3 a = vec3(1.0, 2.0, 3.0) * 2;
```

GLSL 中函数递归是不被允许的，其行为是未定义的。


### 数组

WebGL着色器和javascript语言、C语言一样 可以声明数组类型变量，不过WebGL着色器的数据仅仅支持`一维`数组，不支持多维数组。

```js
// 声明一个数组变量fArr，数组变量fArr有100个元素，元素的数据类型是浮点数
float arr[100];
// 声明一个长度20的三维向量数组变量v3Arr
vec3 v3Arr[20];

// ----------------------------------------------------------

gl_Position =vec4(arr[1],0.0,0.0,1.0)

// -----------------------------------------------------------

//WebGL顶点或片元着色器的数组变量需要传递数据，声明数组变量的时候，需要使用关键词uniform。
uniform float arr[12];
// 传递数组的某个元素  一次传递一个
var arr0 = gl.getUniformLocation(program, "arr[0]")
// 传递数组第1个元素的值
gl.uniform1f(arr0, 0.3);
var arr1 = gl.getUniformLocation(program, "arr[1]")
// 传递数组第2个元素的值
gl.uniform1f(arr1, -0.3);

// 批量传递数组元素值
var arr =gl.getUniformLocation(program, "arr")
var typeArr = new Float32Array([
  0.6,-0.3,0.6,0.4,
  -0.8,-0.3,0.6,0.4,
  0.7,0.7,0.6,0.99,
])
gl.uniform1fv(, typeArr);


// -----------------------------------------------------------
//结构体声明数组元素
// 自定义一个方向光结构体
struct DirectionalLight {
  vec3 direction;//光的方向
  vec4 color;//光的颜色
};
// 声明一个数组变量dirLight，可以存入3个方向光元素
// DirectionalLight声明数组元素的数据类型
uniform DirectionalLight dirLight[3];

// 通过WebGL API给数组中第二个方向光的颜色成员传递值
var lightColor = gl.getUniformLocation(program,'dirLight[1].color');
gl.uniform4f(lightColor, 1.0, 0.0, 1.0,0.7);


```