// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Monitor, async_runtime::TokioRuntime, Manager, Menu, http::ResponseBuilder};
use tauri_runtime::Dispatch;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn create_app<R: tauri::Runtime>(mut builder: tauri::Builder<R>) -> tauri::App<R> {
    builder
        .setup(|app| {
            // do something
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        // remove the string argument on your app
        .build(tauri::generate_context!())
        .expect("failed to build app")
}

fn main() {
    let menu = Menu::new(); // configure the menu

    tauri::Builder::default()
        .menu(menu)
	.setup(|app| {
	    println!("{}", app.package_info().version.to_string());
	    Ok(())
	})
    .register_uri_scheme_protocol("photo", move |app, request| {
        dbg!(&request);

        ResponseBuilder::new()
            .status(200)
            .body(Vec::new())
    })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .unwrap();
}

#[cfg(test)]
mod tests {
    use tauri::Manager;
    #[test]
    fn something() {
        let data = r#"{"name": "the test"}"#;

        let app = super::create_app(tauri::test::mock_builder());
        let window = app.get_window("main").unwrap();
        // do something with the app and window
        // in this case we'll run the my_cmd command with no arguments
        tauri::test::assert_ipc_response(
            &window,
            tauri::InvokePayload {
                cmd: "greet".into(),
                tauri_module: None,
                callback: tauri::api::ipc::CallbackFn(0),
                error: tauri::api::ipc::CallbackFn(1),
                inner: serde_json::from_str(data).unwrap(),
            },
            Ok("Hello, the test! You've been greeted from Rust!"),
        );
    }

    #[test]
    fn test_get_monitor_ids() {
    }
}
