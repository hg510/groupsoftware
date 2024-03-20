# test_map.py

from django.test import LiveServerTestCase
from selenium import webdriver

class MapFunctionalityTestCase(LiveServerTestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()  # Use appropriate WebDriver
        self.driver.get(self.live_server_url)  # Use LiveServerTestCase's live_server_url attribute

    def test_approaching_seed_location(self):
        # Simulate setting the user's location
        # For example, you can execute JavaScript to trigger the 'locationfound' event
        self.driver.execute_script("map.fire('locationfound', {latlng: [50.7362, -3.5307]});")

        # Assert that the route disappears
        # For example, you can check if the routingControls array is empty
        routing_controls = self.driver.execute_script("return routingControls;")
        self.assertEqual(len(routing_controls), 0)

        # Assert that the score updates as expected
        # For example, you can check if the score has increased by the expected amount
        # Make sure to wait for the AJAX request to complete before checking the score
        # (You may need to use WebDriverWait for this)
        score = self.driver.execute_script("return user_score;")
        self.assertEqual(score, 30)  # Assuming the score was initially 0 and increases by 30

    def tearDown(self):
        self.driver.quit()
