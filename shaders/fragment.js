var FragmentShader = `
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec3 u_light1Pos;
        uniform vec3 u_light1Col;
        uniform vec3 u_light2Col;
        uniform vec3 u_light2Pos;

        varying vec3 vecNormal;
        varying vec3 vecPos;
        varying vec2 vUv;

        void main(void) {

		    vec3 st = vec3(vUv,1.0);

        	//colors
			vec3 basecolor = vec3(1.0, 1.0, 1.0);
			float ambient = max(0.0, vecNormal.z);
		    vec3 diffuseLight = vec3(0.3, 0.3, 0.3);


            //LIGHTs
		    vec3 lightDirection = normalize(u_light1Pos-vecPos);
		    vec3 addedLights = clamp(dot(-lightDirection,vecNormal), 0.0, 1.0)*u_light1Col;

		    vec3 lightDirection2 = normalize(u_light2Pos-vecPos);
		    addedLights += clamp(dot(-lightDirection2,vecNormal), 0.0, 1.0)*u_light2Col;

		    addedLights += diffuseLight;
			//PHONG
			float shininess = 5.0;
            gl_FragColor=vec4(basecolor*addedLights,1.0);
        }
`;   
