/**
 * @swagger
 *
 * /users/signUp:
 *  post:
 *    summary: "회원가입 기능"
 *    description: "Request body를 통해 전달받은 정보로 USER를 생성합니다."
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      description: "🔷 구현사항<br>1.이메일 형식 유효성 검사<br>2.비밀번호형식 유효성 검사 ( 영문대소문자, 숫자, 특수문자를 혼합한 8~20자리)<br>3.이름 형식 유효성 검사 (한글이름 2~4자리, 영어이름 2~10자리)<br>4.번호 형식 유효성 검사<br>5.bcryptjs를 사용한 비밀번호 암호화<br><br>🔷 user_type_id<br>대표관리자 = 1<br>지역담당자 = 2<br><br>🔷 provider_institution_id (제공기관)<br>대표관리자는 제공기관을 가질 수 없음.<br>user_type_id = 1일 경우, provider_institution_id 입력시 에러반환"
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                account:
 *                  type: string
 *                  description: "계정"
 *                  example: "test@gmail.com"
 *                password:
 *                  type: string
 *                  description: "비밀번호"
 *                  example: "abc123!!!"
 *                name:
 *                  type: string
 *                  description: "이름"
 *                  example: "홍길동"
 *                phone_number:
 *                  type: string
 *                  description: "휴대폰번호"
 *                  example: "010-2222-2222"
 *                user_type_id:
 *                  type: integer
 *                  description: "관리자/담당자 여부"
 *                  example: "2"
 *                provider_institution_id:
 *                  type: integer
 *                  description: "제공기관"
 *                  example: "1"
 *    responses:
 *      201:
 *        description: 유저생성완료
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                    type: number
 *                    example: 201
 *                message:
 *                    type: string
 *                    example: "회원가입성공."
 *      400:
 *        description: "{이메일/비밀번호/이름/휴대폰/담당지역} 형식이 맞지 않을 경우"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                    type: number
 *                    example: 400
 *                message:
 *                    type: string
 *                    example: "{이메일/비밀번호/이름/휴대폰/담당지역} 형식이 맞지 않습니다."
 *      404:
 *        description: 존재하지 않는 키값을 입력하였을 경우
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                    type: number
 *                    example: 404
 *                message:
 *                    type: string
 *                    example: "존재하지 않는 {유저타입/지역ID} 입니다."
 */
