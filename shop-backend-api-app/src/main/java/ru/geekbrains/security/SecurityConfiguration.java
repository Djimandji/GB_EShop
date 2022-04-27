package ru.geekbrains.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfiguration {

    @Autowired
    public void authConfig(AuthenticationManagerBuilder auth,
                           UserAuthService userAuthService) throws Exception {
        auth.userDetailsService(userAuthService);
    }

    @Configuration
    @Order(1)
    public static class ApiWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {

        // Token repository with proper configuration for Angular CSRF support
        private CookieCsrfTokenRepository cookieCsrfTokenRepository() {
            CookieCsrfTokenRepository csrfTokenRepository = new CookieCsrfTokenRepository();
            csrfTokenRepository.setCookieHttpOnly(false);
            csrfTokenRepository.setCookiePath("/");
            return csrfTokenRepository;
        }

        protected void configure(HttpSecurity http) throws Exception {
            http
                    .authorizeRequests()
                    .anyRequest().permitAll()
                    .and()
                    .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/")
                    .and()
                    .httpBasic()
                    .and()
                    .csrf()
                    .csrfTokenRepository(cookieCsrfTokenRepository());
        }
    }
}
