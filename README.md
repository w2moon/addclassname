# addclassname
因为混淆时动态获得的name可能不正确。
所以给TypeScript生成的__extends类上加上类名
__extends(ClassA,_super);
变成
__extends(ClassA,_super);ClassA.name = "ClassA";
