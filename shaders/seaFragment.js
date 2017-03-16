var seaFragment = `

        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec3 u_light1Pos;
        uniform vec3 u_light1Col;
        uniform vec3 u_light2Col;
        uniform vec3 u_light2Pos;
        uniform vec3 u_ambLight;
        uniform vec3 u_camPos;

        varying vec3 vecNormal;
        varying vec3 vUv;
        varying vec3 camP; 
        varying vec3 camN;
        varying vec3 newpos;

        void main(void) {
           //specular things
           vec3 viewDir = normalize(u_camPos-newpos); //direction camera to vertex
           vec4 alphaV = vec4(1.0, 1.0, 1.0, 0.95); //Alpha for water. 
           vec3 SpecularColor = vec3(1.0, 1.0, 1.0); 
           float SpecularIntensity = 0.1;
        	//colors
			     vec4 basecolor = vec4(0.2, 0.4, 0.5, 1.0);
           vec4 tops = vec4(0.4, 0.5, 0.5, 1.0);

           gl_FragColor = mix(basecolor, tops, smoothstep(0.0, 0.2,newpos.z));

            //LIGHTs
            //diffuse
            vec3 addedLights = u_ambLight; //Set lights to ambient strength
            float diff = max(0.0,dot(vec3(vecNormal.x,-vecNormal.y,vecNormal.z), -normalize(u_light1Pos))); //calculate the diff-light using normal of water and direction of light
            addedLights += diff*u_light1Col; // Add it and then repeat for second light
            diff += max(0.0,dot(normalize(vecNormal), -normalize(u_light2Pos)));
            addedLights += diff*u_light2Col;
            //specular
            vec3 R = normalize(reflect(normalize(u_light1Pos-newpos),normalize(vecNormal)) ); //Calculate R
            float specF = max(0.0, dot(R, vec3(viewDir.x, viewDir.y, -viewDir.z))); //calculate the strenght of the specular
            addedLights += specF*SpecularIntensity*SpecularColor; //Add and then repeat
            R = normalize(reflect(normalize(u_light2Pos-newpos),-normalize(vecNormal)) );
            specF = max(0.0, dot(R, vec3(viewDir.x, viewDir.y, -viewDir.z)));
            addedLights += specF*SpecularIntensity*SpecularColor;

            gl_FragColor = vec4(addedLights,1.0)*gl_FragColor*alphaV;

        }
`;   
